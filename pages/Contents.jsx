import React from 'react';
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    text: {
        fontFamily: "Quicksand_600SemiBold",
        fontSize: 16,
        lineHeight: 24, // Added line height for 1.5 spacing
        marginBottom: 15
    },
    imageStyle: {
        width: '100%', // Take full width of the container
        height: 200,   // Adjust the height as required
        resizeMode: 'contain', // Adjusts the image to fit within the boundaries without stretching or clipping
        marginBottom: 20, // Space between image and the following text
    }
});

export function Foreword() {
    return (
        <ScrollView style={styles.container}>
            <Image
                style={styles.imageStyle}
                source={require('../assets/cat1.jpg')}
            />
            
            <Text style={styles.text}>
                So far as I know, this book is unique. A number of people who suffer with Asperger Syndrome notably Temple Grandin, Donna Williams, David Miedzianik, Therese Joliffe, Kathy Lissner and ‘Darren White’ have given us insight on their experiences, very much from a personal and sometimes idiosyncratic point of view. But Marc has gone a step further by writing an entirely practical and down to earth guide to the nitty-gritty of everyday living for fellow sufferers.
            </Text>
            
            <Text style={styles.text}>
                Marc knows from the inside what people with Asperger Syndrome need to understand, and much of his knowledge has been acquired through bitter experience. His expressed wish is that others should not have to learn by such a hard route, and that some of his own short term disasters should be avoided by others coming after him.
            </Text>

            <Text style={styles.text}>
                Marc has his own theories of how the problems of autism might be construed, and these will be of interest to anyone trying to understand the ‘enigma’, whether from inside or outside. Anyone with Asperger’s would be helped by Marc’s insight that ‘Autistic people have to understand scientifically what non autistic people already understand instinctively’. His views are not solely based in his personal experience, and his suggestions for coping draw on the difficulties he knows to have been experienced by others than himself.
            </Text>

            <Text style={styles.text}>
                This book is packed with really helpful advice, some of which would be difficult for professionals to offer because of not knowing how relevant it might be. Marc can attest to its relevance, and this in itself gives it convincing value for any young man or woman coping with Asperger syndrome; but it is also exceptionally illuminating to families and to professionals who are trying to be helpful, and who often feel inadequate to the task. And Marc reminds us of things we are apt to forget: for instance, that ‘slow progress is still progress’.
            </Text>

            <Text style={styles.text}>
                As someone often involved in counselling both people with Asperger syndrome and their families, I know that I shall be using this book as my most important aid. I believe it could enormously alleviate the frustration and depression suffered by so many young people as they try to integrate with a not very sympathetic world. All of us can be grateful to Marc for his achievement. We are very proud to publish this book.
            </Text>

            <Text style={[styles.text, { fontFamily: "Quicksand_700Bold"}]}>Elizabeth Newson 1997</Text>

            {/* Bottom Spacer */}
            <View style= {{ paddingBottom: 40 }} />
        </ScrollView>
    );
}

export function Introduction() {
    return (
        <ScrollView style={{ padding: 20 }}>
            <Text style={{ fontFamily: "Quicksand_400Regular", fontSize: 16 }}>
                This is the content for Introduction.
            </Text>
        </ScrollView>
    );
}

export function GettingTheBestFromThisBook() {
    return (
        <ScrollView style={{ padding: 20 }}>
            <Text style={{ fontFamily: "Quicksand_400Regular", fontSize: 16 }}>
                Content for 'Getting the best from this book'.
            </Text>
        </ScrollView>
    );
}

export function Worrying() {
    return (
        <ScrollView style={{ padding: 20 }}>
            <Text style={{ fontFamily: "Quicksand_400Regular", fontSize: 16 }}>
                Content for 'Worrying'.
            </Text>
        </ScrollView>
    );
}

// ... continue in this pattern ...

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

