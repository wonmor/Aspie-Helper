Pod::Spec.new do |s|
  s.name           = 'AspieCoach'
  s.version        = '1.0.0'
  s.summary        = 'On-device coaching with Apple Foundation Models'
  s.author         = 'John Seong'
  s.homepage       = 'https://github.com/wonmor/Aspie-Helper'
  s.license        = 'UNLICENSED'
  s.platforms      = { :ios => '15.1' }
  s.source         = { git: '' }
  s.static_framework = true
  s.swift_version  = '5.9'
  s.dependency 'ExpoModulesCore'
  # FoundationModels exists only on iOS 26+: link it weakly so the app
  # still launches on older systems, where the module reports "unsupportedOS".
  s.weak_frameworks = 'FoundationModels'
  s.source_files = '**/*.swift'
end
