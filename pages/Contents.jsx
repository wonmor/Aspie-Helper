import React from "react";
import { View, ScrollView, Text, StyleSheet, Image } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  creditText: {
    fontFamily: "Quicksand_600SemiBold",
    fontSize: 12, // smaller font size for the credit
    textAlign: "center", // align the text to the right
    marginBottom: 15, // margin for spacing
  },
  text: {
    fontFamily: "Quicksand_600SemiBold",
    fontSize: 16,
    lineHeight: 24, // Added line height for 1.5 spacing
    marginBottom: 15,
  },
  imageStyle: {
    width: "100%", // Take full width of the container
    height: 200, // Adjust the height as required
    resizeMode: "contain", // Adjusts the image to fit within the boundaries without stretching or clipping
    marginBottom: 20, // Space between image and the following text
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  tableHeader: {
    flex: 1,
    fontWeight: "bold",
    paddingVertical: 10,
    paddingHorizontal: 5,
    textAlign: "center",
  },
  tableCell: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    textAlign: "center",
  },
  footer: {
    fontSize: 16,
    marginTop: 20,
  },
});

export function Foreword() {
  return (
    <ScrollView style={styles.container}>
      <Image style={styles.imageStyle} source={require("../assets/cat1.jpg")} />

      {/* Photo credit */}
      <Text style={styles.creditText}>Photo by John Seong</Text>

      <Text style={styles.text}>
        So far as I know, this book is unique. A number of people who suffer
        with Asperger Syndrome notably Temple Grandin, Donna Williams, David
        Miedzianik, Therese Joliffe, Kathy Lissner and ‘Darren White’ have given
        us insight on their experiences, very much from a personal and sometimes
        idiosyncratic point of view. But Marc has gone a step further by writing
        an entirely practical and down to earth guide to the nitty-gritty of
        everyday living for fellow sufferers.
      </Text>

      <Text style={styles.text}>
        Marc knows from the inside what people with Asperger Syndrome need to
        understand, and much of his knowledge has been acquired through bitter
        experience. His expressed wish is that others should not have to learn
        by such a hard route, and that some of his own short term disasters
        should be avoided by others coming after him.
      </Text>

      <Text style={styles.text}>
        Marc has his own theories of how the problems of autism might be
        construed, and these will be of interest to anyone trying to understand
        the ‘enigma’, whether from inside or outside. Anyone with Asperger’s
        would be helped by Marc’s insight that ‘Autistic people have to
        understand scientifically what non autistic people already understand
        instinctively’. His views are not solely based in his personal
        experience, and his suggestions for coping draw on the difficulties he
        knows to have been experienced by others than himself.
      </Text>

      <Text style={styles.text}>
        This book is packed with really helpful advice, some of which would be
        difficult for professionals to offer because of not knowing how relevant
        it might be. Marc can attest to its relevance, and this in itself gives
        it convincing value for any young man or woman coping with Asperger
        syndrome; but it is also exceptionally illuminating to families and to
        professionals who are trying to be helpful, and who often feel
        inadequate to the task. And Marc reminds us of things we are apt to
        forget: for instance, that ‘slow progress is still progress’.
      </Text>

      <Text style={styles.text}>
        As someone often involved in counselling both people with Asperger
        syndrome and their families, I know that I shall be using this book as
        my most important aid. I believe it could enormously alleviate the
        frustration and depression suffered by so many young people as they try
        to integrate with a not very sympathetic world. All of us can be
        grateful to Marc for his achievement. We are very proud to publish this
        book.
      </Text>

      <Text style={[styles.text, { fontFamily: "Quicksand_700Bold" }]}>
        Elizabeth Newson 1997
      </Text>

      {/* Bottom Spacer */}
      <View style={{ paddingBottom: 40 }} />
    </ScrollView>
  );
}

export function Introduction() {
  return (
    <ScrollView style={styles.container}>
      <Image style={styles.imageStyle} source={require("../assets/cat2.jpg")} />

      {/* Photo credit */}
      <Text style={styles.creditText}>Photo by John Seong</Text>

      <Text style={styles.text}>
        As far back as I can remember I have had intricate thoughts and ideas
        which have made me unique. As a young child in early primary school, I
        used to spend most of my time just doing my own thing and not really
        making much sense to people. My ever intriguing thoughts and ideas were
        locked up in my head and I couldn’t communicate them to others.
      </Text>

      <Text style={styles.text}>
        When I was seven years of age, I got my diagnosis of autism in a form
        which is now known as Asperger syndrome. It was not that long afterwards
        that I was moved into a special school called Whitfields in Walthamstow,
        London, where for the next eight years I received specialist help, most
        of which came from a joyful, high spirited woman called Jenny. Not long
        after starting this school my family and I became involved in a family
        support group called Kith and Kids in which I am now a regular volunteer
        and work-shopper, always keeping active and creative.
      </Text>

      <Text style={styles.text}>
        At the age of fourteen I changed over to a school called West Lea in
        Edmonton where I was eventually able to take my GCSE’s in which I did
        well. My recognition as being a worthy candidate for GCSE’s was
        predominantly won by the French teacher, Mr Cole to whom I am very
        grateful.
      </Text>

      <Text style={styles.text}>
        At seventeen I was able to begin sixth-form in Winchmore where I worked
        hard at my A- levels but managed to turn myself into a serious target
        for other students’ teasing and torment. It was also at this time when I
        first began learning how to stick up for myself, also realizing that
        there were many unwritten rules about behaviour and conduct which
        everyone else knew except me.
      </Text>

      <Text style={styles.text}>
        I was then accepted by the University of Manchester to do a BSc in
        biochemistry that I have now completed. I began university under the
        same life long illusion I had always had of thinking that making a new
        start meant no more teasing to deal with. However, my social status in
        the first year was appalling and I spent a whole year living in a flat
        with seven other blokes, myself practically in isolation.
      </Text>

      <Text style={styles.text}>
        In the second year I ended up living in a house in Fallowfield where
        there happened to be three friends and two free spaces. I ended up there
        completely by random. I became best mates with Nick who ended up filling
        the extra space. He is a rebel through and through and has since taught
        me many of the tricks of the trade which I have needed on the highly
        worldly and sometimes hostile streets and night clubs of Manchester.
      </Text>

      <Text style={styles.text}>
        Between my second and third year I booked a rather impromptu place on an
        expedition in East Africa where at my own risk I spent much of my time
        away from the group (which rejected me) learning all about the
        lifestyles and customs of the local people. Never before had my poor mum
        been so worried.
      </Text>

      <Text style={styles.text}>
        In my final year I was fortunate enough to live with people who were
        extremely mature and witty in a constructive way. Since graduating I
        have done a variety of work with children with autism both here and
        abroad. I now work as a children’s entertainer and I sincerely feel that
        this has been a successful move.
      </Text>

      <Text style={styles.text}>
        I have now decided to write a book with a purpose. It is aimed at
        passing on my experiences of surviving as an Asperger sufferer in a
        world where every situation is slightly different for the benefit of
        other Asperger sufferers. I wish to lay out a set of rules and
        guide-lines in a style similar to that of the highway code in a format
        which doesn’t change therefore not causing unnecessary confusion. My
        points are intended to be phrased in ways which are unambiguous
        therefore not causing people to get confused or apply things out of
        context.
      </Text>

      <Text style={styles.text}>
        I will probably have an audience which consists of both autistic people
        and non-autistic people. I would like to point out that many of the
        points I show might be down right obvious to some people but completely
        alien to others and I therefore wish to stress that I do not mean to be
        patronizing or pedantic.
      </Text>

      <Text style={styles.text}>
        I choose to write this book now and not later because I feel that the
        relevant mistakes and lessons of my life are still clear in my head.
        Some people might see this book as being a little too worldly but I
        myself believe that if a borderline autistic person has to go out into
        this rather obnoxious world independently then the last thing they need
        is to be sheltered. I would strongly like to equip these people with the
        tricks and the knowledge they need in order to defend themselves and I
        don’t wish to enforce opinions or be hypocritical. I have also drawn
        upon the benefits of constructive feedback from parents of other
        autistic people in writing this book. I would not like to feel that any
        of my autistic readers will be placed under unnecessary pressure to
        start reading this book. To begin with just having this book lying
        around in one’s bedroom might be enough to catch their eye and stimulate
        a healthy interest.
      </Text>

      <Text style={styles.text}>
        I intend for this book to serve the sole purpose of improving the
        quality of people’s lives and would strongly urge any of my autistic
        audience not to get too stressed out trying to apply this book too
        quickly and to remember that Rome was not built in a day.
      </Text>

      <Text style={styles.text}>
        Even I myself am still having difficulties putting all these rules into
        practice, but it certainly helps to be aware of them.
      </Text>

      {/* Bottom Spacer */}
      <View style={{ paddingBottom: 40 }} />
    </ScrollView>
  );
}

export function GettingTheBestFromThisBook() {
  return (
    <ScrollView style={styles.container}>
      <Image style={styles.imageStyle} source={require("../assets/cat3.jpg")} />

      {/* Photo credit */}
      <Text style={styles.creditText}>Photo by John Seong</Text>

      <Text style={styles.text}>
        Not everyone will understand everything in this book straight away but
        if something doesn’t make sense at first then in might make more sense
        if you skip it and come back to it later.
      </Text>

      <Text style={styles.text}>
        This is a book designed to make you aware of the many unwritten rules
        which most people instinctively know and take for granted.
      </Text>

      <Text style={styles.text}>
        When people disobey these unwritten rules, sometimes they get away with
        it but usually those who break informal rules are made to suffer
        informal punishments. These punishments may include being laughed at,
        being treated as a less important person or being isolated.
      </Text>

      <Text style={styles.text}>
        The most difficult thing about being autistic (or having Asperger
        Syndrome) is that so many people expect you to know these rules and live
        by them as they do, even though no-one has told you what these rules
        are. There is no doubt that this is extremely unfair, but unfortunately
        most people don’t see it this way because they don’t understand the
        problem.
      </Text>

      <Text style={styles.text}>
        If you yourself are having trouble accepting that you are autistic (or
        have Asperger Syndrome) you could be making things even more difficult
        for yourself. Accepting such a thing will not only help you to get the
        most out of this book but may also allow you to forgive yourself for
        things you might be doing wrong and take away some of the pain which can
        only be holding you back.
      </Text>

      <Text style={styles.text}>
        Usually there is an unwritten rule against talking about unwritten rules
        in public but it is normally all right to talk about them with parents,
        teachers, counsellors or friends when they are on their own.
      </Text>

      <Text style={styles.text}>
        With many of these rules you are likely to want them explained to you.
        Unfortunately not all of them can be explained without moving away from
        what is important to the aims of this book. Also, many people are able
        to follow the rules in this book perfectly but are not even consciously
        aware of them.
      </Text>

      <Text style={styles.text}>
        If you are so busy questioning these rules that you cannot put them into
        practice you might not be getting the best from this book. However,
        there is no harm in spending some of your time questioning them.
      </Text>

      <Text style={styles.text}>
        Some unwritten rules I have been unable to include either because they
        are too vague and depend too much on the situation or because I may not
        yet have discovered them myself.
      </Text>

      <Text style={styles.text}>
        When you have read this book you might think that these are the rules to
        a rather silly game but the game is life and the rules cannot be
        changed.
      </Text>

      <Text style={styles.text}>
        The problem with the game of life is that every situation is slightly
        different. Some things might be suitable in some situations but not in
        others. This book cannot tell you how to respond in every situation but
        can only set you guide-lines.
      </Text>

      <Text style={styles.text}>
        Autistic people tend to remember detail, non-autistic people tend to
        remember plot. Plot closely accompanies the detective work which enables
        most people to learn unwritten rules of society which are covered in
        this book.
      </Text>

      <Text style={styles.text}>
        You may know some or many of the rules shown in this book already.
        Nonetheless, they must still be included for people who might not yet
        know them.
      </Text>

      <Text style={styles.text}>
        Sometimes certain people might give you advice and criticisms which you
        find slightly patronising, pedantic or unimportant. This might often
        cause you to want to rebel but you could in fact be rebelling against
        the very things which are to be most helpful to you.
      </Text>

      <Text style={styles.text}>
        Remember this book has been written partly on the basis of my own
        personal experiences and that what is right for me doesn’t always have
        to be what’s right for someone else.
      </Text>

      {/* Bottom Spacer */}
      <View style={{ paddingBottom: 40 }} />
    </ScrollView>
  );
}

export function Worrying() {
  return (
    <ScrollView style={styles.container}>
      <Image style={styles.imageStyle} source={require("../assets/cat4.jpg")} />

      {/* Photo credit */}
      <Text style={styles.creditText}>Photo by John Seong</Text>

      <Text style={styles.text}>
        One thing autistic people are often particularly good at is worrying.
      </Text>

      <Text style={styles.text}>
        A lot of your efforts in life might be getting a very poor pay-off and
        you might be finding that everyone around you is speaking freely to each
        other in a way which seems like nonsense to you.
      </Text>

      <Text style={styles.text}>
        If you try to join in by talking back in nonsense people get annoyed.
      </Text>

      <Text style={styles.text}>
        If other people can complain about you speaking nonsense why can’t you
        complain to them about their nonsense? It’s just not fair. Are you
        annoyed? If you are, you have every right to be but you cannot change
        the way things are. This book might however help you to understand other
        people’s nonsense better.
      </Text>

      <Text style={styles.text}>
        The problem with worrying is that it will often distract you from what
        you need to be concentrating on if you are to solve the problem.
      </Text>

      <Text style={styles.text}>
        With some problems seeing the funny side can make it easier. If you can
        learn to laugh at yourself many of your worries might go away.
      </Text>

      <Text style={styles.text}>
        Many people keep all their problems bottled up inside and look as if
        they’re on top of the world but many people need to talk about their
        problems. The trick is to talk to the right people and not the wrong
        ones.
      </Text>

      <Text style={styles.text}>
        Don’t talk about your problems in public or to people who you don’t know
        (except counsellors). If you do you will be broadcasting your weaknesses
        to the people around you. Don’t think they won’t be listening.
      </Text>

      <Text style={styles.text}>
        Talking about your problems in public may get sympathy in the short term
        but will probably isolate you in the long term.
      </Text>

      <Text style={styles.text}>
        You may talk about your problems with teachers, parents, close relatives
        and sometimes with friends if you can get them on their own.
      </Text>

      <Text style={styles.text}>
        Sometimes but not always it is alright to talk about your problems with
        friends in a small group but it should be relevant to the conversation.
      </Text>

      <Text style={styles.text}>
        When you do talk about your problems, try to do it without putting
        yourself down too much. Negative talk causes you negative feelings and
        negative feelings make you less able to defend yourself. You don’t want
        to get bogged down into a vicious cycle.
      </Text>

      <Text style={styles.text}>
        With reference to this last statement, try to get into a positive cycle
        if you can. This is called PMA (positive mental attitude) whereby
        thinking about your positive assets makes you feel more positive about
        yourself and better able to defend yourself from put-downs.
      </Text>

      <Text style={styles.text}>
        Sometimes you may get labelled by people as useless or ignorant. This
        might be because you are not getting the opportunity to show any
        intelligence. NOT because it is true.
      </Text>

      <Text style={styles.text}>
        A horrible feeling having to deal with is guilt. If you think you are to
        blame for something you must ask yourself if you know that you were
        doing something wrong. If you didn’t know, or you only had a vague
        feeling about it then you cannot blame yourself, even if other people
        are. All you can do is to tell yourself that you will try not to do it
        again.
      </Text>

      <Text style={styles.text}>
        Often apologising to someone can help to ease the guilt but ONCE is
        enough. If you over apologise you might start to look shy or vulnerable.
      </Text>

      <Text style={styles.text}>
        If you think that the world is pitted against you, this is an illusion.
        Also, everyone feels like this occasionally.
      </Text>

      <Text style={styles.text}>
        Remember to be patient about using this book. Personal development can
        be a slow and difficult process.
      </Text>

      <Text style={styles.text}>
        Another problem you might face is that achieving things by half does not
        feel like enough. You may be an all or nothing person but remember this
        might be the autism speaking.
      </Text>

      <Text style={styles.text}>
        Remember the key word is DETERMINATION and if you know in your heart you
        can do something then you must go for it.
      </Text>

      {/* Bottom Spacer */}
      <View style={{ paddingBottom: 40 }} />
    </ScrollView>
  );
}

export function LookingOnTheBrightSide() {
  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require("../assets/radiate.jpg")}
      />

      {/* Photo credit */}
      <Text style={styles.creditText}>Photo by John Seong</Text>

      <Text style={styles.text}>
        Many things are easier for intelligent autistic people than they are for
        non-autistic people.
      </Text>

      <Text style={styles.text}>
        Autistic people can be especially good at learning facts, skills and
        talents when (A) they want to and (B) when the right sources are
        available to them. This can provide good career prospects and is
        sometimes enough to compensate for any disabilities.
      </Text>

      <Text style={styles.text}>
        Useful gifts that autistic people might have include photographic
        memories, musical talent, heightened awareness of visual logic and
        extraordinary potential for computer programming.
      </Text>

      <Text style={styles.text}>
        To show consistent punctuality in the workplace and to produce
        meticulously accurate high standard work, always meeting deadlines may
        earn you extra respect from your manager or supervisor.
      </Text>

      <Text style={styles.text}>
        Some people say that honesty is not always the best policy but if you
        can recreate the truth accurately to the right people and yet be able to
        withhold the truth when confidentiality is needed your unsurpassable
        honesty might earn you great respect.
      </Text>

      <Text style={styles.text}>
        If you are generally a quiet person who often only speaks when it is
        worth while this can sometimes be very welcome in the workplace.
      </Text>

      <Text style={styles.text}>
        Having not been bound all your life by the unwritten rules of society
        may have made you a highly original thinker.
      </Text>

      <Text style={styles.text}>
        In many situations where non-autistic people might be provoked or feel
        intimidated , autistic people can be unaffected and keep a clear head.
        You might be completely detached and immune to tense atmospheres and bad
        vibes which other people have to suffer. The problem with this however,
        will be that you are also immune to danger signals but this book might
        help you to recognise them.
      </Text>

      <Text style={styles.text}>
        If you wish, you might be able to get formal allowances and benefits to
        help you out in life. Try not to see it as cheating. If you have had a
        hard enough life then perhaps you deserve this special consideration.
        Also, this might come in handy if ever you need to present yourself in a
        court of law in which case it may be a good idea to get the backing of a
        good psychologist who understands the problem.
      </Text>

      {/* Bottom Spacer */}
      <View style={{ paddingBottom: 40 }} />
    </ScrollView>
  );
}

export function BodyLanguage() {
  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require("../assets/maracca.jpg")}
      />

      {/* Photo credit */}
      <Text style={styles.creditText}>Photo by John Seong</Text>

      <Text style={styles.text}>
        Body language doesn’t just include gestures, it also includes facial
        expressions, eye contact and tone of voice and is sometimes affected by
        what you are wearing.
      </Text>

      <Text style={styles.text}>
        Some people may have body language down to a fine art but many people
        find it difficult.
      </Text>

      <Text style={styles.text}>
        Many people constantly feel paranoid about their own body language,
        including those who are extremely good at it.
      </Text>

      <Text style={styles.text}>
        Showing the wrong emotion or laughing at the wrong time can be
        embarrassing. You may do this if you’re thinking about one thing and the
        people around you are talking about something else. If someone reacts to
        this, tell them that your mind was elsewhere.
      </Text>

      <Text style={styles.text}>
        If someone talks to you about something they find emotional and you
        don’t respond to their body language with your own, they might think you
        are lacking empathy or that you don’t really care.
      </Text>

      <Text style={styles.text}>
        If someone tells you that you do not give enough body language you might
        have to exaggerate it in order to emphasise what you say but not too
        much. This will at first feel artificial.
      </Text>

      <Text style={styles.text}>
        Part of body language includes courtesy things like ‘excuse me’,
        ‘please’, ‘thanks’, ‘cheers’, ‘see ya’ and being the first to say ‘hi’.
        It is often an effort to say these things but then perhaps courtesy is
        supposed to be an effort. I have given informal courtesies here (not
        over-polite) but the politeness of the courtesies you choose may have to
        depend on the people you are with.
      </Text>

      <Text style={styles.text}>
        We all have to be careful about standing behind someone when they can’t
        see us because if they turn round they might get a fright. This is
        especially important if you are large or tall. In a densely crowded bus
        or train however you might not be able to help it.
      </Text>

      <Text style={styles.text}>
        It can often be an effort to have a shower or a bath three times a week
        and to wear deodorant but it is much easier to talk to people if you
        feel you are clean and if you cannot be smelt. Remember, if you smell
        you might not be aware of it.
      </Text>

      <Text style={styles.text}>
        If you are too good at body language or you look too cool, people are
        less likely to make exceptions for you if you do something wrong without
        knowing it.
      </Text>

      <Text style={styles.text}>
        If you are an adult and especially if you are a large one, it is better
        to avoid running in the street unless the street is practically empty.
        Running for a bus or a train is all right if it will save you having to
        wait for another half an hour or you are in a hurry to get somewhere. On
        the other hand if you are going for a jog then wear shorts or track suit
        trousers so that people can see you are running for the purpose of
        getting exercise and hopefully don’t feel intimidated.
      </Text>

      <Text style={styles.text}>
        When you see someone in the street who you know it can sometimes be
        awkward but to exchange glances, smile slightly and raise eyebrows to
        each other is usually enough.
      </Text>

      {/* Bottom Spacer */}
      <View style={{ paddingBottom: 40 }} />
    </ScrollView>
  );
}

export function Boundaries() {
  return (
    <ScrollView style={styles.container}>
      <Image style={styles.imageStyle} source={require("../assets/stop.jpg")} />

      {/* Photo credit */}
      <Text style={styles.creditText}>Photo by John Seong</Text>

      <Text style={styles.text}>
        Boundaries are all about not getting too close to someone yet not being
        too far away.
      </Text>

      <Text style={styles.text}>
        The correct boundaries will depend on the person you are talking to and
        also the time and place.
      </Text>

      <Text style={styles.text}>
        If there is a physical attraction between you and someone else you will
        need give off AND read the correct signals. To do this the simplest rule
        to work by is that open gestures (such as open hands or arms) and
        gestures turned towards someone tend to mean attraction, whereas closed
        gestures (hands in fists, arms across chest) and gestures which are
        turned away from someone tend to mean avoidance.
      </Text>

      <Text style={styles.text}>
        There is something to be aware of called the approach-avoidance trap.
        Quite often we need to be decisive about whether we are going to
        approach someone, walk away or do neither.
      </Text>

      <Text style={styles.text}>
        Also there is the problem of recognising other people’s territory. If in
        some one-off situation you unknowingly encroach on what someone else
        considers to be their territory this can sometimes get you into big
        trouble. For example, at one time I lent a listening ear to a woman
        living in a house full of children. She was distraught because her
        over-possessive and just-out-of-prison boyfriend had just stormed out
        for no particular reason. I didn’t realise that from his point of view
        it was his territory. Fortunately my personal safety was spared because
        he didn’t come back until the next day. If after you make this kind of
        mistake you later have it explained to you it can all start to look so
        obvious.
      </Text>

      {/* Bottom Spacer */}
      <View style={{ paddingBottom: 40 }} />
    </ScrollView>
  );
}

export function EyeContact() {
  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require("../assets/monkey1.jpg")}
      />

      {/* Photo credit */}
      <Text style={styles.creditText}>Photo by John Seong</Text>

      <Text style={styles.text}>
        Eye contact is hard to get right because it is hard to tell whether you
        are giving someone too much eye contact or too little when they are
        talking to you.
      </Text>

      <Text style={styles.text}>
        While people are not talking and when you are not talking to them, it is
        often best not to look at them. This is because people can usually see
        that you are looking at them out of the corner of their eyes and this
        may make them feel uncomfortable, in which case they might talk about
        you behind your back. To control your gaze might be difficult for you
        but it is by no means impossible.
      </Text>

      <Text style={styles.text}>
        If you point at someone when you are talking about them to someone else,
        this may seem rude if they notice. If you are arguing with someone and
        point at them while giving eye contact, this may come across as quite
        aggressive. Try not to point at people - it will help you stay out of
        trouble.
      </Text>

      <Text style={styles.text}>
        When you are talking to someone or they are talking to you, you are
        expected to look at them bearing in mind the following guidelines:
      </Text>

      <Text style={styles.text}>
        o To look at someone for less than one third of the time may be
        communicating that either you are shy (if you keep looking down) or you
        are dishonest (if you keep looking to the side).
      </Text>

      <Text style={styles.text}>
        o To look at someone for more than two thirds of the time may be
        communicating that either you like them (if you are looking at the face
        as a whole) or you are aggressive (if you are looking straight into
        their eyes)
      </Text>

      <Text style={styles.text}>
        o To look at someone for the whole time giving steady and unbroken eye
        contact can mean one of two things. Either you are challenging them (the
        aggressive gaze) or you fancy them (the intimate gaze). However in other
        cultures (e.g. Mediterranean Europe) it can also symbolise
        companionship. For someone with autism it can be very difficult because
        first we have to be sure that it IS appropriate. Also fixed eye contact
        can forcefully distract us when we try to talk.
      </Text>

      {/* Bottom Spacer */}
      <View style={{ paddingBottom: 40 }} />
    </ScrollView>
  );
}

export function ToneOfVoice() {
  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require("../assets/horse1.jpg")}
      />

      {/* Photo credit */}
      <Text style={styles.creditText}>Photo by John Seong</Text>

      <Text style={styles.text}>
        You might be one of these people who almost talks in a single tone
        without knowing it.
      </Text>

      <Text style={styles.text}>
        Ask a trustworthy person if this is true and if it is you may have to
        exaggerate the intonation in your voice to emphasise what you say, but
        not too much. This will sound artificial at first.
      </Text>

      <Text style={styles.text}>
        If you are reading a story-book to a child then the more intonation the
        better.
      </Text>

      <Text style={styles.text}>
        The intonation in our voices is extremely important in determining
        whether we are being enthusiastic or sarcastic about something. It is
        also important in telling whether we mean something seriously or just as
        a joke.
      </Text>

      <Text style={styles.text}>
        To talk in a single tone can make it sound as if you’re depressed. When
        talking about something good or exciting you have to make yourself sound
        excited too, otherwise people tend to think it sounds strange.
      </Text>

      <Text style={styles.text}>
        If you are a young man whose voice is breaking, then if you find it more
        comfortable just let it break for good. It may sound strange at first on
        the inside but it will be sounding much more natural on the outside. If
        you are worried about what your friends might think which should only be
        a short term problem anyway, it may be useful to take the opportunity of
        letting your voice break while you are changing schools.
      </Text>

      <Text style={styles.text}>
        Finally, remember not to speak too loudly and not to speak too quietly.
        This should depend on the distance between you and the other person and
        the voice should be quieter when a bit of secrecy is needed. Whisper
        when everyone else is whispering (or when there is someone asleep
        nearby).
      </Text>

      <Text style={styles.text}>
        At times when you may need to talk extra loudly and clearly (e.g. on
        stage or in a play) then you may want to project your voice. To do this
        keep a nice straight relaxed posture and imagine that your voice is
        coming from your stomach, however strange this may seem.
      </Text>

      {/* Bottom Spacer */}
      <View style={{ paddingBottom: 40 }} />
    </ScrollView>
  );
}

export const DressSense = () => {
  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require("../assets/temple.jpg")}
      />

      {/* Photo credit */}
      <Text style={styles.creditText}>Photo by John Seong</Text>

      <Text style={styles.text}>
        What clothes you wear gives off a message about you.
      </Text>
      <Text style={styles.text}>
        If you wear bright clashing coloured clothes, perhaps intending to look
        confident, many people are likely to lose interest in you.
      </Text>
      <Text style={styles.text}>
        If you wear cowboy boots, ripped jeans, heavy metal tee shirts and a
        studded leather jacket people might either be too scared to come near
        you or will expect to be able to talk to you about heavy metal music
        systems, life on the streets and various different night clubs. It is a
        very difficult image to pull off.
      </Text>
      <Text style={styles.text}>
        If you dress in natural colours such as blue, grey, dark-green, black or
        white which people cannot laugh at but still look trendy people will
        judge you on how you come across rather than what you are wearing which
        is likely to be what you need.
      </Text>
      <Text style={styles.text}>
        It is often a good idea to hear someone else’s opinion about what you
        should wear (talk to someone who you can trust).
      </Text>

      {/* Bottom Spacer */}
      <View style={{ paddingBottom: 40 }} />
    </ScrollView>
  );
};

export const DistortionsOfTheTruth = () => {
  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require("../assets/reality.jpg")}
      />

      {/* Photo credit */}
      <Text style={styles.creditText}>Photo by John Seong</Text>

      <Text style={styles.text}>
        Sarcasm is when someone says one thing but means the opposite. For
        example - in response to hearing someone burp, someone else might say
        ‘how polite’. The easiest way of picking up on sarcasm is by listening
        to the tone of voice. You may need to defend yourself against sarcasm at
        times and this will be covered in the following chapters.
      </Text>
      <Text style={styles.text}>
        Not knowing the truth is a common reason why people might distort it.
      </Text>
      <Text style={styles.text}>
        A particularly nasty form of distorted truth is ‘scape-goating’. This is
        setting up other people to take the blame for things which aren’t their
        fault. What is even worse is having someone deliberately do something
        wrong for the sole purpose of getting you blamed for it. If this happens
        you must first work out whether it is just a joke or whether it is a
        serious set-up. If it is serious and the blame successfully reaches you,
        you may need to somehow prove that the wrong doing was not your fault in
        which case you must tell the right people that you think you’ve been set
        up and stick to your word.
      </Text>
      <Text style={styles.text}>
        On the other hand someone might quite innocently create a false truth
        for the mere purpose of fantasy play. This might apply to children
        pretending to be comic cartoon heroes, adults dressed up in costume
        pretending to be Father Christmas or someone who is acting in a play.
      </Text>
      <Text style={styles.text}>
        If someone asks you a question and giving them the true answer might
        upset them or cause embarrassment or unfair trouble to other people you
        may decide to tell a ‘white lie’ which is intended to avoid
        unpleasantness all round.
      </Text>
      <Text style={styles.text}>
        If you don’t wish to lie you might still want to withhold the truth. You
        might be keeping a secret for someone or you might be trying to keep
        yourself or others out of trouble. In this case it may be sensible to
        avoid certain topics of conversation, otherwise you might be forced into
        pretending not to know something using awkward diversion tactics (which
        often involve humour) or even lying. Also you may be expected to
        automatically know when something is to be kept a secret.
      </Text>
      <Text style={styles.text}>
        If someone tries to get a message across to you without hurting you,
        they might decide to drop a hint. The best example of this is when a man
        is chatting up a woman but she doesn’t want to go out with him in which
        case instead of saying ‘I’m not interested, go away’ she might slip the
        words ‘my boyfriend’ into the conversation.
      </Text>
      <Text style={styles.text}>
        Sometimes it is possible to be misled by figures of speech (i.e.
        metaphors). For example ‘I’m over the moon’ means I’m very happy. If
        figures of speech are a problem for you, they can be looked up in
        certain books or you can get someone to teach you some.
      </Text>
      <Text style={styles.text}>
        Sometimes someone might lie to you if they want something from you. The
        best example of this is a door-to-door salesman who wants your money. If
        he sells you a television that doesn’t work then he would be conning
        you.
      </Text>
      <Text style={styles.text}>
        In conversation it is not unusual for people to exaggerate. Someone who
        says ‘I had about ten pints last night’ might actually mean they only
        had five. People who exaggerate too much can easily be misinterpreted.
      </Text>
      <Text style={styles.text}>
        If someone says something which sounds offensive in the literal sense
        ‘You ugly mug face’ but with a laugh and a smile, then they mean it as a
        joke. You often need to pick up on this quite quickly.
      </Text>
      <Text style={styles.text}>
        Perhaps the most awkward kind of lies you encounter are teasing lies in
        which someone says something as a joke to see whether or not you believe
        them. If what they have just said is highly unlikely or people around
        them are trying not to laugh, they are probably teasing you. The correct
        response to this would be to laughingly tell them to p*ss off. If you
        show doubt as to whether or not they are teasing you, they may see it as
        a sign of vulnerability. Remember they are probably never going to admit
        that they are teasing you, no matter how seriously you ask.
      </Text>
      <Text style={styles.text}>
        People might start trying to persuade you to make a spectacle of
        yourself somehow. For example they may ask you to do a dance or sing a
        song. Even if you can’t see anything wrong with this yourself, it is
        important not to give in to them, no matter how persuasive they become.
        The correct response is the same as that for a teasing lie, only perhaps
        with a touch of anger. If you give in to such requests, you will
        probably become an all-round target for other people’s teasing. If you
        have already done this in the past, don’t worry, just don’t let it
        continue.
      </Text>
      <Text style={styles.text}>
        If ever joining in games like ‘truth or dare’ or ‘strip poker’ you may
        have to decide for yourself if any given situation is acceptable.
      </Text>
      <Text style={styles.text}>
        It must be remembered that not everyone is loyal to the truth. Also,
        many people select certain parts of the truth and reject others to their
        own advantages (e.g. in court cases).
      </Text>
      <Text style={styles.text}>
        If you need to find out whether or not someone is lying and you have a
        good reason for doing so, asking them questions might reveal faults in
        their logic.
      </Text>

      {/* Bottom Spacer */}
      <View style={{ paddingBottom: 40 }} />
    </ScrollView>
  );
};

export function MisunderstandingsOtherPeopleMightHaveAboutYou() {
  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require("../assets/alien.jpg")}
      />

      {/* Photo credit */}
      <Text style={styles.creditText}>Photo by John Seong</Text>

      <Text style={styles.text}>
        If you have difficulties with your eye-contact or body language, some
        people might mistake you for being shifty or dishonest. If they think
        this they are probably wrong.
      </Text>

      <Text style={styles.text}>
        If you don’t react to other people’s body language with your own, they
        might mistake you for being unsympathetic.
      </Text>

      <Text style={styles.text}>
        Many people might make the mistake of thinking you are unintelligent. If
        this is because you rarely get a chance to show them signs of
        intelligence, there may be little you can do except to let them
        accidentally see you doing something you’re good at, whether they like
        it or not, just as a one off. They might decide not to comment, even
        though they have seen your talent.
      </Text>

      <Text style={styles.text}>
        If you try to come across as being cooler, wittier, tougher and more
        confident that other people, then whenever you break an unwritten rule
        people might mistake it for nastiness. In this case, it might be in your
        best interest to drop your pretence.
      </Text>

      {/* Bottom Spacer */}
      <View style={{ paddingBottom: 40 }} />
    </ScrollView>
  );
}

export function Conversation() {
  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require("../assets/convo.jpg")}
      />

      {/* Photo credit */}
      <Text style={styles.creditText}>Photo by John Seong</Text>

      <Text style={styles.text}>
        It may be known to you that the art of conversation is carried out
        within a set of constraining rules.
      </Text>

      <Text style={styles.text}>
        When people take part in a conversation, what they say normally has to
        follow on from the last thing that was said. We stick to the relevant so
        that the conversation flows smoothly.
      </Text>

      <Text style={styles.text}>
        Be careful of stating the obvious. You may also wish to avoid asking
        questions when you can work out the answer for yourself. This way the
        conversation covers more useful ground.
      </Text>

      <Text style={styles.text}>
        Try to avoid repeating yourself or rephrasing yourself when you have
        already been understood. This may be rather difficult because repetition
        of thought is quite fundamental to autism. The same thoughts can go
        round and round ‘obsessively’ in your head. If you have to go on talking
        about it, try to think up new angles or different ways of putting it;
        better still, look for a way of leading into a different subject. I take
        the approach of always looking for new things to think about. This seems
        to have been quite a successful move.
      </Text>

      <Text style={styles.text}>
        There may be subjects that fascinate you and you really want to talk
        about them. If your listeners’ eyes look unfocused, or they keep looking
        over your shoulder, they may be getting bored. You can say ‘Sorry I’ve
        been going on, it’s a favourite subject of mine’.
      </Text>

      <Text style={styles.text}>
        Also, some people reply to things you say before even giving you a
        chance to finish your sentence. However, if they have anticipated you
        correctly then there is usually no need for you to finish.
      </Text>

      <Text style={styles.text}>
        If you say something that doesn’t make sense to the people around you
        they might get annoyed but will probably forgive you. After all,
        everyone does this sometimes. Just don’t do this too often.
      </Text>

      <Text style={styles.text}>
        If there is something you need to say which is not relevant but is
        important, for example ‘Bob phoned for you today’ or ‘there’s something
        I’d like to talk to you about which is worrying me’ it is best to find
        the suitable person when they’re not having a conversation. Try to find
        the right moment, get your timing right. If you need to pass on a phone
        call and think that you might forget if you are kept waiting too long,
        just write it down and leave it by the phone.
      </Text>

      <Text style={styles.text}>
        If what you need to tell them is vitally important for example ‘Bob has
        just had a nasty knock on the head and is lying unconscious’, then you
        MUST interrupt their conversation.
      </Text>

      <Text style={styles.text}>
        To join in a conversation you need to listen to it. Listening can be
        extremely difficult, especially if you have to keep your ears open 24
        hours a day, but you can get better with practice. The most important
        thing to listen to is the plot of the conversation.
      </Text>

      <Text style={styles.text}>
        Be on the lookout for eye contact from other people as it can often mean
        they would like to hear your point of view.
      </Text>

      <Text style={styles.text}>
        It is easier to listen if you don’t make any assumptions or
        pre-conceived ideas about what someone is going to say.
      </Text>

      <Text style={styles.text}>
        Some topics of conversation are taboo subjects and if you are in doubt
        they are sometimes better left alone.
      </Text>

      <Text style={styles.text}>
        When a conversation becomes emotional people often say things like
        ‘cheer up’, ‘it’ll be all right’, ‘oh that’s wonderful!’ or ‘well
        done!’. When you try to say these things they might sound rather corny
        and sentimental at first but they serve the same purpose as remembering
        to buy someone a birthday card. They serve to open up the conversation
        and invite the other person to express how they feel.
      </Text>

      {/* Bottom Spacer */}
      <View style={{ paddingBottom: 40 }} />
    </ScrollView>
  );
}

export function GeneralKnowledge() {
  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require("../assets/spaceship.jpg")}
      />

      {/* Photo credit */}
      <Text style={styles.creditText}>Photo by John Seong</Text>

      <Text style={styles.text}>
        Although it is often true that autistic people are better at picking up
        details this is only when making a conscious effort to do so and there
        may be great problems in picking up the right details.
      </Text>

      <Text style={styles.text}>
        Also getting absorbed into one’s own head-space every other moment can
        make it extremely difficult to ‘learn things on the trot’ which is the
        way most non-autistic people are used to doing it.
      </Text>

      <Text style={styles.text}>
        It might be difficult to join in a conversation if you don’t have the
        general knowledge which is needed. The problem with this kind of
        knowledge is that there is no one source from which you can find it out
        but here are some tips:
      </Text>

      <Text style={styles.text}>
        General knowledge in conversations is usually about sport (in the UK
        usually football), pop music, films, politics, the media, TV, peoples
        computers, clothes, hobbies and going out. It is however rare to find
        someone who is an expert on all of these things.
      </Text>

      <Text style={styles.text}>
        Many teenagers and young adults who are into music put more emphasis on
        the pop stars than they do on the music they write. Sometimes they even
        select their partners on the basis of who they look like in the world of
        music or sport. Sometimes with this type of person you just have to
        accept that you may not be compatible and look for friends elsewhere.
      </Text>

      <Text style={styles.text}>
        With reference to this last statement, sport (e.g. football) can also be
        quite selective. Sport is often a highly patriotic occupation in that
        people are friendly to each other if they support the same team but
        argue with and confront all those who support different teams.
      </Text>

      <Text style={styles.text}>
        TV, radio, magazines, libraries, video libraries and newspapers can help
        you learn about these topics. Also many leaflets which can be found in
        magazines give you a list of all the most popular albums, CDs and films.
        To force yourself to learn about things which don’t interest you,
        however, may be a waste of time since you won’t really want to join in
        with the conversations about them.
      </Text>

      <Text style={styles.text}>
        If you decide to teach yourself the general knowledge you need in
        certain conversations it is important that you also try to learn by
        listening to the conversations themselves, paying special attention to
        famous people when they are mentioned. This can make the learning
        process much faster.
      </Text>

      {/* Bottom Spacer */}
      <View style={{ paddingBottom: 40 }} />
    </ScrollView>
  );
}

export function Names() {
  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require("../assets/flags.jpg")}
      />

      {/* Photo credit */}
      <Text style={styles.creditText}>Photo by John Seong</Text>

      <Text style={styles.text}>
        Picking up people’s names can be a problem but it is very important for
        topics of conversation involving famous people or for following plots to
        films, books and especially to detective stories.
      </Text>

      <Text style={styles.text}>
        Picking up names of people you know personally may also be difficult but
        it is not quite as essential as you might think. If you remember not to
        ask someone’s name more than two times and after this if you still can’t
        remember the name, to listen out for the next time someone calls it, you
        can usually get away with having a bad memory for names.
      </Text>

      <Text style={styles.text}>
        It helps to remember names if you make a mental note linking them with
        faces; for example thinking things like ‘Sarah’s the one with the nose
        ring’ or ‘Bob ‘s the one with the moustache’.
      </Text>

      {/* Bottom Spacer */}
      <View style={{ paddingBottom: 40 }} />
    </ScrollView>
  );
}

export function HumourAndConflict() {
  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require("../assets/monkey2.jpg")}
      />

      {/* Photo credit */}
      <Text style={styles.creditText}>Photo by John Seong</Text>
      <Text style={styles.text}>
        An autistic person’s sense of humour is often about things which suggest
        silliness, ridiculousness or which appear slightly insane.
      </Text>

      <Text style={styles.text}>
        It may be necessary to keep your laughter to yourself when there is
        something which is funny to you but not as funny to other people.
        Laughter is one of the best feelings in the world and to have to hold it
        back is a nuisance but nonetheless to laugh at the wrong times may annoy
        other people.
      </Text>

      <Text style={styles.text}>
        A non-autistic person’s sense of humour is often to do with finding
        clever ways of pointing out faults in other people and causing them
        embarrassment. Everyone is a victim of someone else’s humour at some
        time or another but some people are made to suffer more than others.
        Sometimes non-autistic people can get quite ruthless with their humour.
        This is especially true amongst teenagers and younger adults who are
        perhaps less likely to care than older people.
      </Text>

      <Text style={styles.text}>
        In the eyes of many zoologists, humour is a human replacement for the
        violence which animals use on each other to establish an order of
        dominance (the pecking order).
      </Text>

      <Text style={styles.text}>
        No-one talks about the pecking order of which they are a part.
      </Text>

      <Text style={styles.text}>
        Many gangs or groups of people are not particularly welcoming to
        outsiders but some are more welcoming than others.
      </Text>

      <Text style={styles.text}>
        Often, the reason two or more people gang up on one person is because it
        gives them a feeling of being united together. For reasons such as this,
        it is often easier to talk seriously to people if you can find them on
        their own.
      </Text>

      <Text style={styles.text}>
        If you say or do something that can be misinterpreted into a sexual
        context then it probably will be a joke, often at your expense.
      </Text>

      <Text style={styles.text}>
        If you are a victim of someone else’s humour, it is often possible to
        translate it (in your own mind) into constructive criticism and then it
        might be personality building.
      </Text>

      <Text style={styles.text}>
        If a joke aimed at you is not too harsh it may be a good idea to laugh
        at yourself.
      </Text>

      <Text style={styles.text}>
        If a joke or some sarcasm aimed at you is too harsh, you can say ‘what
        do you mean by that’, ‘why did you say that’, ‘what’s that supposed to
        mean’, or ‘that’s not very nice’. You may have to use your discretion in
        order to choose a suitable answer but putting someone else on the spot
        can be quite a good defence.
      </Text>

      <Text style={styles.text}>
        If a joke or some sarcasm aimed at you is downright hurtful, here is a
        last resort you can use. Calmly say that you found the joke hurtful and
        ask if it was meant to be hurtful. If the other person says ‘can’t you
        take a joke’ or messes you around in some other way, stick to your guns
        and just calmly ask them again if they meant it to be hurtful. If they
        answer ‘no’ then you have got what you needed. If they answer ‘yes’ then
        calmly walk away and in future make it very difficult for that person to
        talk to you until they apologise of their own accord.
      </Text>

      <Text style={styles.text}>
        Questions are often a much more powerful form of defence than
        statements.
      </Text>

      <Text style={styles.text}>
        Remember that people who put you down unfairly and without purpose are
        often feeling weak in themselves and are mirroring their own feelings of
        weakness onto you.
      </Text>

      <Text style={styles.text}>
        If you wish to join in and make jokes at the expense of other people,
        bear in mind that you should try not to make your jokes hurtful, even if
        other people do. People who do this are usually in the wrong.
      </Text>

      <Text style={styles.text}>
        Comedy is not just about playful confrontation, it is also a very clever
        way in which people can accept the tragedies of life without getting
        depressed. ‘If we didn’t laugh then we’d cry’.
      </Text>

      {/* Bottom Spacer */}
      <View style={{ paddingBottom: 40 }} />
    </ScrollView>
  );
}

export function Invitation() {
  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require("../assets/baseball.jpg")}
      />

      {/* Photo credit */}
      <Text style={styles.creditText}>Photo by John Seong</Text>
      <Text style={styles.text}>
        It is bad manners to turn up at someone else’s house uninvited unless
        they have said ‘come round anytime’ in which case they could mean about
        once a month or they could mean every other day depending on many
        things.
      </Text>

      <Text style={styles.text}>
        On the other hand it can sometimes be difficult to know what constitutes
        an invitation.
      </Text>

      <Text style={styles.text}>
        It is often best to phone first before turning up at someone’s house.
      </Text>

      <Text style={styles.text}>
        In some setting e.g. student hall the rules are slightly different
        because people are often running in and out of each other’s flats
        anyway. None the less still be careful.
      </Text>

      <Text style={styles.text}>
        An Invitation to a party does NOT mean that you have to go if you don’t
        want to.
      </Text>

      <Text style={styles.text}>
        If you gate-crash a party with more than 20 people but keep a low
        profile, nobody should mind.
      </Text>

      <Text style={styles.text}>
        It is sometimes difficult to know whether or not you are overstaying
        your welcome at someone else’s house or whether they would like you to
        stay longer. If they say they are feeling tired then this might be a
        gentle hint that they want you to go. If they are smiling, giving you
        plenty of eye contact and showing an interest in the conversation they
        probably want you to stay.
      </Text>

      {/* Bottom Spacer */}
      <View style={{ paddingBottom: 40 }} />
    </ScrollView>
  );
}

export function PersonalSecurity() {
  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require("../assets/graffiti.jpg")}
      />

      {/* Photo credit */}
      <Text style={styles.creditText}>Photo by John Seong</Text>
      <Text style={styles.text}>
        It is best for anyone, male or female, to avoid walking alone late at
        night down deserted or badly lit streets but here are some tips for
        protecting yourself:
      </Text>

      <Text style={styles.text}>
        Always make sure your wallet is out of sight.
      </Text>

      <Text style={styles.text}>
        You may do well to look over your shoulder every now and then.
      </Text>

      <Text style={styles.text}>Don’t look down, look straight ahead.</Text>

      <Text style={styles.text}>
        Look like you know where you are going and show no fear.
      </Text>

      <Text style={styles.text}>
        Following these guide-lines will make you look less vulnerable and more
        able to defend yourself. Some people find taking classes in martial arts
        helps them to be (and look) confident.
      </Text>

      <Text style={styles.text}>
        If someone threatens you and you start running just keep on running.
      </Text>

      <Text style={styles.text}>
        If it is too late or you are unable to run, let them have your wallet if
        they ask for it. This is a small price to pay for your personal
        security.
      </Text>

      <Text style={styles.text}>
        If they take your wallet cancel all your credit cards as soon as
        possible and get them replaced.
      </Text>

      <Text style={styles.text}>
        Never try and bargain or reason with your mugger(s).
      </Text>

      <Text style={styles.text}>
        Finally, ALWAYS phone your mum or dad and let them know if you have
        decided to stay the night at someone else’s house or they will be so
        worried they will call the police to search for you. (I’m assuming you
        remembered to tell them you were going out for the evening in the first
        place!)
      </Text>

      {/* Bottom Spacer */}
      <View style={{ paddingBottom: 40 }} />
    </ScrollView>
  );
}

export function FindingTheRightFriends() {
  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.header, styles.text]}>
        It is often difficult to tell the difference between a true friend and a
        fake friend but for autistic people, this can be many times harder. Here
        is a table to help you tell the difference.
      </Text>

      <View style={styles.tableRow}>
        <Text style={[styles.tableHeader, styles.text]}>True Friends</Text>
        <Text style={[styles.tableHeader, styles.text]}>Fake Friends</Text>
        <Text style={[styles.tableHeader, styles.text]}>Enemies</Text>
      </View>

      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, styles.text]}>
          Treat you the same way they treat all their friends.
        </Text>
        <Text style={[styles.tableCell, styles.text]}>
          May treat you differently to how they treat others.
        </Text>
        <Text style={[styles.tableCell, styles.text]}>
          May ignore you most of the time.
        </Text>
      </View>

      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, styles.text]}>
          Will treat you as an equal.
        </Text>
        <Text style={[styles.tableCell, styles.text]}>
          Might often make unfair requests of you.
        </Text>
        <Text style={[styles.tableCell, styles.text]}>
          Will often treat you as a less important person than them.
        </Text>
      </View>

      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, styles.text]}>
          Make you feel welcome in the long term as well as the short term.
        </Text>
        <Text style={[styles.tableCell, styles.text]}>
          Might make you feel welcome in the short term and then drop you in the
          dirt.
        </Text>
        <Text style={[styles.tableCell, styles.text]}>
          Will make you feel unwelcome and will notice all your mistakes and may
          bring them to the attention of other people.
        </Text>
      </View>

      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, styles.text]}>
          If they give you compliments they will be genuine and sincere.
        </Text>
        <Text style={[styles.tableCell, styles.text]}>
          Might give you many compliments which are NOT genuine.
        </Text>
        <Text style={[styles.tableCell, styles.text]}>
          May give you anything from sarcasm, put-downs and temper tantrums to
          the silent treatment.
        </Text>
      </View>

      <Text style={[styles.footer, styles.text]}>
        You are likely to meet many people who don’t fit exactly into any one
        category in this table, in which case you must use your discretion.
        {"\n\n"}
        Don’t be living under the illusion that everyone who knows you cares
        about you because they don’t. People who care about you will probably
        fall under the category of true friends or will otherwise be family.
        {"\n\n"}
        Never underestimate the value of a true friend.
      </Text>

      {/* Bottom Spacer */}
      <View style={{ paddingBottom: 40 }} />
    </ScrollView>
  );
}

export function KeepingACleanSlate() {
  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require("../assets/slate.jpg")}
      />

      {/* Photo credit */}
      <Text style={styles.creditText}>Photo by John Seong</Text>
      <Text style={styles.text}>
        Whenever we go into a completely new environment and no-one knows us
        yet, we start off with an undamaged reputation, that is a clean slate.
      </Text>

      <Text style={styles.text}>
        It is largely by breaking the unwritten rules of society that people
        dirty their slates.
      </Text>

      <Text style={styles.text}>
        If you can keep using what you have read in this book, then it should be
        enough to allow you to keep a fairly clean slate, but don’t expect to
        keep it cleaner than everyone else’s slates.
      </Text>

      <Text style={styles.text}>
        Everyone tries to keep a mental note of everyone else’s slate in their
        little group. This includes things people have said, things they have
        done, things they can and cannot do and the general way in which they
        come across.
      </Text>

      <Text style={styles.text}>
        It is mostly on the basis of your slate that people will be able to make
        fun of you.
      </Text>

      <Text style={styles.text}>
        If your slate is already dirty, don’t despair; it is often a reversible
        process and if you are patient by ceasing to do anything wrong it should
        slowly improve.
      </Text>

      <Text style={styles.text}>
        Try not to tell someone too much about yourself or any of your
        weaknesses unless you have got to know them quite well because knowledge
        is power. This does not mean you have to bottle things up. (See chapter
        on Worrying)
      </Text>

      <Text style={styles.text}>
        If you wish, then by keeping your ears open you can learn about what’s
        on other people's slates.
      </Text>

      <Text style={styles.text}>
        Some people like to stand out. People who stand out but who cannot keep
        to the unwritten rules whilst doing so, can very easily make themselves
        into a target for other people’s teasing or neglect.
      </Text>

      <Text style={styles.text}>
        Making a spectacle of one’s self is also an easy way to become a target;
        but if you have Asperger Syndrome then it is often very difficult to
        know exactly what this means.
      </Text>

      <Text style={styles.text}>
        Making a spectacle of yourself is normally about doing things in public
        which makes you look different to everyone else (being the odd one out).
      </Text>

      <Text style={styles.text}>
        People who are able to stand out and be popular at the same time are
        said to have charisma. This is a gift which some people have but not
        others and it can often involve having a very accurate understanding of
        what is going on around you. It is popular belief that you can only have
        charisma if you were born that way but in the case of Asperger Syndrome
        this statement is not applicable.
      </Text>

      <Text style={styles.text}>
        It is usually better to stand out from the inside than on the outside.
      </Text>

      {/* Bottom Spacer */}
      <View style={{ paddingBottom: 40 }} />
    </ScrollView>
  );
}

export function ComingClean() {
  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require("../assets/camera.jpg")}
      />

      {/* Photo credit */}
      <Text style={styles.creditText}>Photo by John Seong</Text>
      <Text style={styles.text}>
        Amongst certain groups of people, you might decide you want to come
        clean and tell them that you are autistic. This is entirely your own
        choice.
      </Text>

      <Text style={styles.text}>
        You might, however, wish to tell just one person in the group
        (preferably the one who is friendliest towards you) in which case if you
        want it kept a secret, it might be a good idea to say so, otherwise the
        message might spread behind your back and it can be extremely difficult
        to tell whether or not people know.
      </Text>

      <Text style={styles.text}>
        If you are coming clean for the first time in your life, it might be a
        very difficult move; but as people find out they might become a little
        less hostile and a little more accepting.
      </Text>

      <Text style={styles.text}>
        On the other hand, you might have come clean to so many different people
        that you are sick and tired of saying it.
      </Text>

      <Text style={styles.text}>
        You might find coming clean a more effective tactic as you get older.
        People who are caring and mature might bring many things to your
        attention in order to be constructive. However, it is better if they do
        this while there are just the two of you in the room. You may need to
        point this out at the time.
      </Text>

      <Text style={styles.text}>
        Coming clean might make some people very interested in you and may give
        you a lot to talk about.
      </Text>

      <Text style={styles.text}>
        If the message that you are autistic gets to someone who has been giving
        you a particularly hard time, it may make them feel guilty and do some
        good, but not always.
      </Text>

      <Text style={styles.text}>
        The worst reaction you can get is when people become more hostile
        towards you because of having found out. This will nearly always be from
        people who didn’t like you much to start with or who have little or no
        knowledge of autism.
      </Text>

      <Text style={styles.text}>
        To deal with people who don’t believe you when you say you are autistic
        can be difficult but to have a detailed understanding of the problem can
        be very helpful in shattering the myths (e.g. when people say you can’t
        possibly be autistic because you make too much eye contact, or even
        because you can talk!)
      </Text>

      <Text style={styles.text}>
        Amongst children or young teenagers it might be a better idea if you do
        not come clean, at least until you know them very well.
      </Text>

      <Text style={styles.text}>
        Within the world of autism and Asperger Syndrome, there is quite a
        demand for ‘out of the closet’ Asperger sufferers, who are able to
        explain to parents, teachers and professionals exactly what it feels
        like to be autistic. There can also be money in it.
      </Text>

      {/* Bottom Spacer */}
      <View style={{ paddingBottom: 40 }} />
    </ScrollView>
  );
}

export function Education() {
  return (
    <ScrollView style={styles.container}>
  <Image
        style={styles.imageStyle}
        source={require("../assets/laptop.jpg")}
      />

      {/* Photo credit */}
      <Text style={styles.creditText}>Photo by John Seong</Text>
      <Text style={styles.text}>
        You might have teachers who are holding you back by thinking you are not intelligent enough to take your exams. If you know inside that you are, then this can be extremely frustrating. Try to get the help of a teacher who you seem to get on well with.
      </Text>

      <Text style={styles.text}>
        If you are being held back because you are not doing all that well at your English exams then it might be because you write about situations which are strange and not realistic, in which case having read this book might help you. Remember, this subject is more about feeling than it is about words.
      </Text>

      <Text style={styles.text}>
        Listen to any advice or instructions offered to you by your teachers even if at first it sounds unimportant to you. It helps them to be sympathetic if you make it clear that you are listening by nodding or saying ‘Right’.
      </Text>

      <Text style={styles.text}>
        When people explain things to you which sound interesting or you are in a lesson, it is important to look interested otherwise people could easily assume that you are bored. Remember that speakers do watch the expressions on the faces of their audience.
      </Text>

      <Text style={styles.text}>
        Pay close attention to your school reports because they are often chock-a-block with constructive criticisms.
      </Text>

      <Text style={styles.text}>
        One of the problems you are likely to face in classes or lectures is concentration. No-one is able to concentrate 100% for a whole hour but to take short-hand notes which you will be able to look back on is normally to be expected.
      </Text>

      <Text style={styles.text}>
        If a lecturer or teacher asks a question and no-one puts their hand up it is often because no-one wants to stand out NOT because no-one knows the answer.
      </Text>

      <Text style={styles.text}>
        It is sometimes slightly difficult to distinguish between the information you do and don’t need to commit to memory.
      </Text>

      <Text style={styles.text}>
        If you try to show lots of obscure academic knowledge to get public recognition, then you might be going the wrong way about it, however intelligent the people you are talking with are.
      </Text>

      <Text style={styles.text}>
        Remember that most people exaggerate about how little work they do.
      </Text>

      <Text style={styles.text}>
        Try not to compare yourself too much with other people.
      </Text>

      <Text style={styles.text}>
        You might get especially worried about your exams but remember that you can still live a happy and fulfilling life even without any qualifications at all, and many people have to.
      </Text>

      <Text style={styles.text}>
        You might find maths, science, foreign languages and computer studies easier than things like English and History, contrary to what most people find easier.
      </Text>

      <Text style={styles.text}>
        Make sure you choose a subject which leads to a job where you don’t have to keep socialising and chatting people up. The ‘back-room’ jobs like computer, research or pharmacology are easier from this point of view than selling, management, teaching or social work.
      </Text>

      <Text style={styles.text}>
        Remember that there are set rules and conventions about academic method and presentation. To conform to these guide-lines and closely follow a syllabus can be very significant to your final grades.
      </Text>

      <Text style={styles.text}>
        One symptom of autism is that you may feel unsettled if your daily or weekly routine is disrupted. You might be able to structure your time so that you have time alloted for working in and time set aside for other things like watching TV, films, listening to music or going out. If someone invites you to go out try not to worry too much about your work, try to be flexible. You will have plenty more time for work.
      </Text>

      {/* Bottom Spacer */}
      <View style={{ paddingBottom: 40 }} />
    </ScrollView>
  );
}