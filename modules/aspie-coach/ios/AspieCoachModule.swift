import ExpoModulesCore
#if canImport(FoundationModels)
import FoundationModels
#endif

public class AspieCoachModule: Module {
  public func definition() -> ModuleDefinition {
    Name("AspieCoach")

    // "available" | "deviceNotEligible" | "appleIntelligenceNotEnabled" |
    // "modelNotReady" | "unavailable" | "unsupportedOS"
    Function("availability") { () -> String in
      #if canImport(FoundationModels)
      if #available(iOS 26.0, *) {
        switch SystemLanguageModel.default.availability {
        case .available:
          return "available"
        case .unavailable(let reason):
          switch reason {
          case .deviceNotEligible: return "deviceNotEligible"
          case .appleIntelligenceNotEnabled: return "appleIntelligenceNotEnabled"
          case .modelNotReady: return "modelNotReady"
          @unknown default: return "unavailable"
          }
        }
      }
      #endif
      return "unsupportedOS"
    }

    // One stateless turn: the JS side passes the instructions and a compact
    // transcript in `prompt`, so nothing is kept between calls.
    // Resolves { text } on success or { error } with a short code.
    AsyncFunction("respond") { (instructions: String, prompt: String) async -> [String: String] in
      #if canImport(FoundationModels)
      if #available(iOS 26.0, *) {
        guard case .available = SystemLanguageModel.default.availability else {
          return ["error": "unavailable"]
        }
        let session = LanguageModelSession(instructions: instructions)
        do {
          let response = try await session.respond(
            to: prompt,
            options: GenerationOptions(temperature: 0.6, maximumResponseTokens: 600)
          )
          return ["text": response.content]
        } catch let error as LanguageModelSession.GenerationError {
          switch error {
          case .guardrailViolation: return ["error": "guardrail"]
          case .exceededContextWindowSize: return ["error": "tooLong"]
          default: return ["error": "failed"]
          }
        } catch {
          return ["error": "failed"]
        }
      }
      #endif
      return ["error": "unsupportedOS"]
    }
  }
}
