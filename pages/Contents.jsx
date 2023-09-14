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
        source={require("../assets/temple.jpg")}
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

export function FurtherReading() {
  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontFamily: "Quicksand_400Regular", fontSize: 16 }}>
        This is the content for Further Reading.
      </Text>
    </ScrollView>
  );
}

export function BodyLanguage() {
  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontFamily: "Quicksand_400Regular", fontSize: 16 }}>
        This is the content about body language.
      </Text>
    </ScrollView>
  );
}

// ... and so on for the rest ...
