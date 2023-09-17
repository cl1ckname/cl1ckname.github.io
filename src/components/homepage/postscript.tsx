import React, {useState} from "react";

export default function Postscript() {
    const [deleted, setDeleted] = useState(false)

    return (!deleted) ? <>
            <code>
                — Well, yes, VaNya =^._.^= ∫. We realized that you are a programmer. We realized that you're all such
                a joking🤡 and an IT guy and a bit of α μαθεματικαν, but what's next? Do you really
                have no interests other than what you already do at work? Or do you think that a couple
                of pages on the Internet makes your personality not so empty? Come on, someone has
                already done all these things before you, you don't even hesitate to write about it.
                Well, how much time did you spend on it? A few months? <i>On my iPhone with a safari
                browser and a 5.8-inch vertical screen, nothing works fine</i>, what have you been doing at
                all? Please think about your life, about what is important and necessary for you, what
                you really want to leave behind. At least your peers are smiling. They play, walk, fall
                in love, look for themselves. They remember what happened to them yesterday or a week
                ago without referring to the GIT. They know what they have to do without resorting to
                JIRA. Perhaps even someone whom you only give a contemptuous look has an idea in his
                head that he came up with himself. Please don't get lost.
            </code>
            <p>
                <a style={{color: "red"}}>はぁ そう です か, はぁ そう です か?</a><img className="gif-emoji"
                                                                                        src="/images/kaguya.png"
                                                                                        alt="ha sodesuka?"/> fair enough,
                but not too offensive.
                But
                what can I do? I am 1,013 days old when I write this. So far, this is the best way
                to interact with the world that I have. This is already quite a lot, it seems to me. Personality? Who needs
                personality anyway in the world of simulacrums and victorious postmodern? You are also not a real person, I
                actually wrote this text myself.
            </p>
            <p className="marquee">
                $By the way, soon all programmers will be replaced by the neural networks, have you heard?
                Buy my designer course btw.$
            </p> In short, all claims are erroneous. Mewover, I did this section for myself. All
            the others, too, but this one in particular. And in general,
            it seems so inappropriate now that it was better to remove.
            <button onClick={() => {
                setDeleted(true)
            }}>Delete bad section</button>
        </> :
        <p>
            Yes, that's much better. I'm glad you supported me. If you're going to address me I left my contacts there,
            write
            if you found a <span style={{textDecoration: "underline dotted red"}}>mitsake</span> here or if you have any
            ideas about what is happening here. If you have a job, write
            too,
            I don't have a resume on <a href="https://linkedin.com/clickname">LinkedIn</a>, but isn't everything clear
            to you without further ado?). I also hope that
            you
            are watching this through a PC. Yes, now the world of mobile phones, and it would be possible to adapt
            everything, but you really lose a lot by giving up the <span style={{fontSize: "2em"}}>big screen</span>. So
            don't be lazy. And eat well, exercise,
            read books, watch movies <sub>and cartoons</sub> take care of the people around you. <mark>Live and don't
            die</mark>. <button>Ok,
            mom</button>
        </p>
}