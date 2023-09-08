import "../styles/wiki.css"
import "../styles/homepage.css"
import FlipText from "@/components/homepage/flipText";
import Head from "next/head";
import {NextApiRequest} from "next"
import {Bungee_Spice, VT323} from "next/font/google"
import Postscript from "@/components/homepage/postscript";

const bungee = Bungee_Spice({subsets: ['latin'], weight: "400"})
const vt323 = VT323({subsets: ['latin'], weight: "400"})

export async function getServerSideProps(props: { req: NextApiRequest }) {
    const forwarded = (props.req.headers["x-forwarded-for"] || " anon ") as string
    const ip = forwarded ? forwarded.split(/, /)[0] : props.req.connection.remoteAddress
    return {
        props: {
            ip,
        },
    }
}

export default function MainPage(props: { ip: any }) {
    return <>
        <Head>
            <title>Clickname's garden</title>
        </Head>
        <div>
            <div id="mw-page-base" className="noprint"></div>
            <div id="mw-head-base" className="noprint"></div>
            <div id="content" className="mw-body ve-init-mw-desktopArticleTarget-targetContainer" role="main">
                <a id="top"></a>
                <div id="siteNotice">
                    <div id="centralNotice"></div>
                </div>
                <div className="mw-indicators">
                </div>
                <h1 id="firstHeading" className="firstHeading mw-first-heading"><span className="mw-page-title-main">Clickname (Ivan Vasilev)</span>
                    <img src="/pepe_dance.gif" className="gif-emoji" alt="sad pepe"/>
                </h1>
                <div id="bodyContent" className="vector-body"><span className="mw-editsection mw-content-ltr ve-hide"
                                                                    dir="ltr"
                                                                    style={{
                                                                        float: "right",
                                                                        clear: "right",
                                                                        position: "relative",
                                                                        zIndex: 2,
                                                                        marginBottom: "0.5em",
                                                                        lineHeight: "inherit"
                                                                    }}><span
                    className="mw-editsection-bracket">[</span><a

                    className="mw-editsection-visualeditor" title="Править преамбулу">править</a><span
                    className="mw-editsection-divider"> | </span><a

                    title="Править преамбулу">править код</a><span className="mw-editsection-bracket">]</span></span>
                    <div id="siteSub" className="noprint">Content from my head - free encyclopedia</div>
                    <div id="contentSub">
                        <div id="mw-content-subtitle">
                            <div id="mw-fr-reviewnotice" className="plainlinks flaggedrevs_preview">I'm too lazy to
                                update
                                this page,
                                the information may not be up-to-date.
                            </div>
                            <div id="mw-fr-revisiontag"
                                 className="flaggedrevs_short flaggedrevs_draft_notsynced plainlinks noprint">
                                <div className="flaggedrevs_short_basic"><span title="Текущая версия"
                                                                               className="flaggedrevs-icon oo-ui-widget oo-ui-widget-enabled oo-ui-iconElement-icon oo-ui-icon-block oo-ui-iconElement oo-ui-labelElement-invisible oo-ui-iconWidget"></span><b><a
                                    title="Википедия:Проверка статей/Пояснение для читателей">Текущая версия</a></b> [<a
                                    className="external text">показать
                                    стабильную версию</a>]
                                    (<a className="external text">сравнить</a>)<span
                                        id="mw-fr-revisiontoggle" title="показать/скрыть подробности"
                                        className="fr-toggle-arrow oo-ui-widget oo-ui-widget-enabled oo-ui-indicatorElement-indicator oo-ui-indicator-down oo-ui-indicatorElement oo-ui-labelElement-invisible oo-ui-indicatorWidget"></span>
                                </div>
                                <div id="mw-fr-revisiondetails-wrapper" style={{position: "relative"}}>
                                    <div id="mw-fr-revisiondetails" className="flaggedrevs_short_details"
                                         style={{display: "none"}}>Текущая
                                        версия страницы пока <a
                                            title="Википедия:Проверка статей/Пояснение для читателей">не
                                            проверялась</a> опытными участниками и может значительно отличаться от <a
                                            className="external text">версии</a>,
                                        проверенной 3 апреля 2018 года; проверки требуют <a className="external text">5
                                            правок</a>.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="mw-content-text" className="mw-body-content mw-content-ltr" lang="ru" dir="ltr">
                        <div className="mw-parser-output">
                            <table className="infobox infobox-064c6ca8d70d5243" data-name="Персона">
                                <tbody>
                                <tr>
                                    <th colSpan={2} scope="colgroup" className="infobox-above">
                                        Clickname🐢
                                    </th>
                                </tr>
                                <tr>
                                    <td colSpan={2} className="infobox-image">
                           <span typeof="mw:File/Frameless"><a
                               href="/me_and_ducks.jpeg" className="mw-file-description"><img alt="me and ducks"
                                                                                              src="/me_and_ducks.jpeg"
                                                                                              decoding="async"
                                                                                              width="274" height="397"
                                                                                              className="mw-file-element"
                                                                                              data-file-width="480"
                                                                                              data-file-height="696"/></a></span>
                                        <span data-wikidata-qualifier-id="P2096" className="media-caption"
                                              style={{display: "block"}}>who fell in love is gay</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="plainlist">Born</th>
                                    <td className="plainlist">
                            <span className="nowrap"><a title="29 November">29 November</a> <a
                                title="2002y">2002</a></span><br/>
                                        <span><a title="Париж">Penza</a></span>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="plainlist">Date&nbsp;of death</th>
                                    <td className="plainlist">
                                        <span className="nowrap"><a
                                            title="enamelled vessel, the window, the nightstand, the bed,">Never</a> </span>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="plainlist">Country</th>
                                    <td className="plainlist">
                                        <ul>
                                            <li><span><span className="mw-image-border" typeof="mw:File"><span><img
                                                alt="Флаг"
                                                src="//upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/22px-Flag_of_Russia.svg.png"
                                                decoding="async"
                                                width="22"
                                                height="15"
                                                className="mw-file-element"
                                                data-file-width="900"
                                                data-file-height="600"/></span></span>&nbsp;<span
                                                className="country-name"><span><a
                                                title="Russia">Russia</a></span></span></span>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="plainlist">Occupation</th>
                                    <td className="plainlist">
                                    <span><span><a
                                        title="Композитор">Software engineer</a></span></span>, <span><span><a
                                        title="Дирижёр">math student</a></span></span>, <span><span><a
                                        className="mw-redirect"
                                        title="Музыковед">digital artist</a></span></span>,
                                        <span><span><a title="Военнослужащий">toad enjoyer</a></span></span></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="plainlist">Alma matter</th>
                                    <td className="plainlist">
                                        <span><a>Saint Petersburg State University</a> (SPBU)</span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>

                            <figure typeof="mw:File/Thumb">
                                <img src="/cv.png" decoding="async" width="260"
                                     alt="computer vision experiments"
                                     height="174" className="mw-file-element"/>
                                <figcaption>Me while computer vision experiments
                                    (v̨͔͖̪̟͊̓o͙̻̞̩̩̠̺̽͘ͅi̟̤̥͎͈̥̪͋͗͘d̷͍̭̙̲͚̫͇̘͛ͩͩ̓e̙̭͓̼͕ͩ̐́ͅd̜̯͍̩̝͎͑̋̿̀͘ͅ)
                                </figcaption>
                            </figure>
                            <p><b>Ivan Vasilev</b> (<a>ru.</a>&nbsp;<span lang="ru" style={{fontStyle: "italic"}}>Иван Васильев</span>;
                                <a title="29 November"> 29 November</a> <a className="mw-redirect"
                                                                           title="2002">2002</a>, <a
                                    title="Penza">Penza</a>) — <a title="pm pu">mathematician student </a>, a man of his
                                time,
                                the only person in Russia who got out of the wheel of Samsara. Found a metanarrative,
                                but
                                does not
                                show or tell anyone about it. Alive SAT solver. Best esoteric bimbo gf. Hello
                                dear {props.ip}
                                <img className="gif-emoji" src="/bulbasaur.gif" alt="lazy bulbasaur"/>
                            </p>
                            <div id="toc" className="toc" role="navigation" aria-labelledby="mw-toc-heading"><input
                                type="checkbox"
                                role="button"
                                id="toctogglecheckbox"
                                className="toctogglecheckbox"
                                style={{display: "none"}}/>
                                <div className="toctitle" lang="en" dir="ltr"><h2 id="mw-toc-heading">Contents</h2><span
                                    className="toctogglespan"><label className="toctogglelabel"></label></span>
                                </div>
                                <ul>
                                    <li className="toclevel-1 tocsection-1"><a href="#Общие_сведения"><span
                                        className="tocnumber">1</span>
                                        <span className="toctext">Why did I create this page</span></a></li>
                                    <li className="toclevel-1 tocsection-2"><a href="#Награды"><span
                                        className="tocnumber">2</span> <span
                                        className="toctext">CS interests</span></a></li>
                                    <li className="toclevel-1 tocsection-3"><a href="#Fun-content-here"><span
                                        className="tocnumber">3</span>
                                        <span className="toctext">Fun content here</span></a>
                                        <ul>
                                            <li className="toclevel-2 tocsection-4"><a
                                                href="/Physarum"><span
                                                className="tocnumber">3.1</span> <span
                                                className="toctext">Physarum</span></a></li>
                                            <li className="toclevel-2 tocsection-4"><a
                                                href="/tree"><span
                                                className="tocnumber">3.1</span> <span
                                                className="toctext">Pythagorean tree</span></a></li>
                                            <li className="toclevel-2 tocsection-4"><a
                                                href="/pool"><span
                                                className="tocnumber">3.1</span> <span
                                                className="toctext">Newton's pool</span></a></li>
                                        </ul>
                                    </li>
                                    <li className="toclevel-1 tocsection-5"><a href="#Примечания"><span
                                        className="tocnumber">4</span> <span
                                        className="toctext">P.S.</span></a></li>
                                    <li className="toclevel-1 tocsection-6"><a href="#Литература"><span
                                        className="tocnumber">5</span> <span
                                        className="toctext">My tech stack</span></a></li>
                                </ul>
                            </div>

                            <h2><span
                                className="mw-headline" id="Общие_сведения">Why did I create this page🤔</span><span
                                className="mw-editsection"><span
                                className="mw-editsection-bracket">[</span><a

                                className="mw-editsection-visualeditor"
                                title="Редактировать раздел «Общие сведения»">править</a><span
                                className="mw-editsection-divider"> | </span><a

                                title="Редактировать раздел «Общие сведения»">править код</a><span
                                className="mw-editsection-bracket">]</span></span></h2>
                            <p>Initially, I just had a site dedicated to fractals, I was <b>interested</b> in drawing
                                them
                                and
                                giving my friends the opportunity to do it <FlipText>interactively</FlipText>. However,
                                it
                                soon became clear that
                                there are not so many interesting fractals, just drawing various L-systems is not so
                                interesting. Subsequently, I somewhat rethought the concept of a personal page on the
                                Internet and decided to make it really personal. Also, going off the topic of fractals
                                gives
                                me more freedom in content creation.
                            </p>
                            <p> The <b className="rainbow-text"> frontend developer </b> can show the page. The mobile
                                developer can show the app. A ML
                                engineer can show a neural network (as a rule, if he does not do really boring things).
                                What
                                can a backend developer do? Say something like <q className="void-text">look, mom,
                                    this <a
                                        href="https://ru.wikipedia.org/wiki/JSON">JSON</a> is assembled by my <a
                                        href="https://kubernetes.io/"> k8s</a> cluster which is proxied through <a
                                        href="https://nginx.org/"> Nginx</a> and pulls
                                    data from sharded database,
                                    look at my benchmarks mom, are you happy mom? Are you proud of me? Parents, beloved,
                                    friends, why you're leaving, it's only the first endpoint don't leave me, I'm scared</q>.
                                In
                                general, coding is a good way to <FlipText>interact</FlipText> with the world. As if the
                                well-known
                                principles
                                of composition and decomposition, substitution and inversion of dependencies are
                                applicable
                                to everything.
                                Sounds so so😒. What is even more depressing is that this site is not the answer to this
                                question. But this is something very close, as if with the exception of the technologies
                                used (not a single docker container was affected during the development process). Most
                                of
                                the projects here require ⚡good optimization⚡ so that a weak laptop or phone can run
                                them.
                            </p>
                            <h2><span
                                className={"mw-headline " + bungee.className} id="Произведения">CS interests</span><span
                                className="mw-editsection"><span
                                className="mw-editsection-bracket">[</span><a

                                className="mw-editsection-visualeditor"
                                title="Редактировать раздел «Произведения»">править</a><span
                                className="mw-editsection-divider"> | </span><a

                                title="Редактировать раздел «Произведения»">править код</a><span
                                className="mw-editsection-bracket">]</span></span>
                            </h2>
                            <p>It has long been so customary that I am engaged in backend. Why? It just seems to me that
                                the
                                backend gives more interesting tasks, and the study of the backend itself is much more
                                interesting. In addition, the backend gives more choice in terms of <select>
                                    <option>language</option>
                                    <option>platform</option>
                                    <option>database</option>
                                    <option>architecture</option>
                                    <option>delivery</option>
                                    <option>api</option>
                                    <option>authentication</option>
                                </select>,
                                For example, I prefer Sql to Nosql for basic <a
                                    href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9SMpGhqwYdcXFzhA_mRnxaol8zjdtRi8lAQ&usqp=CAU">CRUD</a> tasks,
                                and I
                                truly
                                love it🥰. I prefer to develop in two languages at the same time - GoLang and NodeJS,
                                because I want to. Go is good for parallel and productive programs, system programming.
                                You
                                can write fast and fun on the Node, you can <a href="https://imgur.com/a/T1KPzI0">write
                                    the WEB</a>. By themselves, these
                                languages
                                are very strange, but this is rather a plus.
                            </p>
                            <p>However, it's all about work, like to <span style={{
                                color: "#fc566c",
                                backgroundColor: "#faddaf",
                                fontFamily: "monospace"
                            }}>$earn_money();</span>.
                                But the world of ₵$ is much wider and
                                more
                                interesting. As I wrote above, programming is a way of interacting with the world. And
                                this
                                is a huge scope for creativity and self-realization.
                            </p>
                            <h3>
                    <span
                        className="mw-headline" id="Physarum">Things that I find
                                <span style={{color: "pink", textShadow: "0em -0.8em black"}}> funny</span></span><span
                                className="mw-editsection"><span className="mw-editsection-bracket">[</span><a

                                className="mw-editsection-visualeditor"
                                title="Редактировать раздел «Гимн Имперской армии Японии»">править</a><span
                                className="mw-editsection-divider"> | </span><a

                                title="Редактировать раздел «Гимн Имперской армии Японии»">править код</a><span
                                className="mw-editsection-bracket">]</span></span></h3>
                            <figure className="mw-halign-left" typeof="mw:File/Thumb"><a
                                href="/someone.png"
                                className="mw-file-description"><img
                                src="/someone.png"
                                decoding="async" width="180" height="289" className="mw-file-element"
                                data-file-width="750"
                                data-file-height="1204"/></a>
                                <figcaption>yes, you can trust me with firearms (well, or your server)</figcaption>
                            </figure>
                            <p>First of all - <span className={vt323.className} style={{
                                color: "darkgreen",
                                fontSize: "1.5em"
                            }}>computer graphics</span>. In my first year, I realized what a shader is. This
                                made a
                                very strong impression on me, because it is a very simple and elegant way to "draw" with
                                the
                                help of mathematics. Even just throwing random functions, some "𝕞𝕒𝕥𝕙𝕖𝕞𝕒𝕥𝕚𝕔𝕒𝕝 𝕟𝕠𝕚𝕤𝕖"
                                gives
                                interesting results.
                            </p>
                            <p>Next comes image processing.
                                <span style={{
                                    display: "inline-block",
                                    transform: "skew(15deg) scaleY(1.3)",
                                    color: "#30c7b6"
                                }}>Rooms with distorting mirrors and video effects on the first
                                smartphones made me laugh and amused.</span> However, learning to look for more and more
                                niche
                                information, I began to stumble upon more and more interesting solutions. Computer
                                vision in
                                the same bunch. Once upon a time, neural networks even seemed interesting to me in the
                                context of image processing. Maybe they give visually pleasing pictures, but the way to
                                get
                                them is very clumsy and usually the same for completely different things.
                                Conventionally,
                                the neuron that colors the pictures and that applies the Van Gogh style to the images
                                are
                                made almost the same. But algorithms like <a
                                    href="https://trekhleb.dev/js-image-carver/">Seam Carving</a> or <a
                                    href="https://www.youtube.com/watch?v=n4tbdFD18vs">Strip photography</a> have
                                nothing
                                in
                                common at all.
                            </p>https://www.gimp.org/
                            <p>
                                I am also very impressed <img alt="Midoria lmao" src="/impression.gif"
                                                              className="gif-emoji"/> and
                                fascinated by everything related to data storage.
                                Archivers,
                                data structures, file systems. Walking in the forest of binary trees is very
                                interesting. My
                                favorites are the <a href="https://en.wikipedia.org/wiki/Van_Emde_Boas_tree">Van Ende
                                Boas</a> tree and the <a href="https://en.wikipedia.org/wiki/AVL_tree">AVL</a> tree.
                                This is something that seems
                                very
                                important to me, but I didn't have enough time to study it in detail (yet).
                            </p>
                            <div style={{
                                float: "right",
                                color: "black",
                                fontSize: "80%",
                                fontFamily: "monospace",
                                fontWeight: "bold",
                                clear: "both"
                            }}>
                                <div className={"window"} style={{display: "block"}}>
                                    <div className={"title-bar"}>
                                        <div className="title-bar-text">
                                            Paint 4D
                                        </div>
                                        <div className="title-bar-controls">
                                            <button aria-label="Minimize"></button>
                                            <button aria-label="Maximize"></button>
                                            <button aria-label="Close"></button>
                                        </div>
                                    </div>
                                    <div className="window-body">
                                        <img src="/gopher-dance.gif" alt="gopher-dance" width={192} height={192}/>
                                        <br/>
                                        <span>me when i... sorry,<br/> i lied, i never</span>
                                    </div>
                                    <div className="status-bar">
                                        <p className="status-bar-field">Press F1 for help</p>
                                        <p className="status-bar-field">Close</p>
                                    </div>
                                </div>
                            </div>
                            <h2><span
                                className="mw-headline" id="Fun-content-here">Fun content here</span><span
                                className="mw-editsection"><span
                                className="mw-editsection-bracket">[</span><a

                                className="mw-editsection-visualeditor"
                                title="Редактировать раздел «Произведения»">править</a><span
                                className="mw-editsection-divider"> | </span><a

                                title="Редактировать раздел «Произведения»">править код</a><span
                                className="mw-editsection-bracket">]</span></span>
                            </h2>
                            <h3>
                                <span className="mw-headline" id="Physarum">Physarum</span>
                            </h3>
                            <p>
                                Have you noticed that people of technical professions are very fond of animals? You can
                                argue that everyone loves animals, but here love is of a completely different kind. When
                                a mascot is selected for some technology, it is in 90% of cases an animal. So we have
                                a&nbsp;
                                <a href="https://www.networkworld.com/article/2942838/docker-the-container-company-with-a-whale-of-a-logo-adopted-a-real-whale.html">whale🐋</a> in&nbsp;
                                a <a href="https://www.docker.com/">Docker</a>, an <a
                                href="https://docs.php.earth/php/community/elephpant/">elePHPant🐘</a> in a <a
                                href="https://www.php.net/">PHP</a>, a <a
                                href="https://kernel.org"> Linux</a> <a
                                href="https://en.wikipedia.org/wiki/Tux_(mascot)">Tux-penguin🐧</a>, <a
                                href="https://rustacean.net/">a crab🦀</a> in <a
                                href="https://www.rust-lang.org/">Rust</a>, a <a
                                href="https://en.opensuse.org/openSUSE:Artwork_brand">chameleon🦎</a>
                                in an <a href="https://en.opensuse.org/">OpenSuse</a>, a <a
                                href="https://www.gnu.org/graphics/agnuhead.html">GNU🦌</a> in <a
                                href="https://www.gnu.org/">GNU</a>, a <a
                                href="https://go.dev/blog/gopher">beaver-gopher🦫</a> in a <a
                                href="https://go.dev">Golang</a>, <a
                                href="https://www.freelogodesign.org/blog/2019/06/14/the-story-behind-the-mozilla-firefox-logo">a
                                red panda🦊</a> in a <a href="https://www.mozilla.org/ru/firefox/">Firefox</a>, a&nbsp;
                                <a href="http://logoshistory.blogspot.com/2010/09/mysql-logo-history.html">dolphin🐬</a>
                                in a <a href="https://www.mysql.com/">MySQL</a>, another <a
                                href="https://learnsql.com/blog/the-history-of-slonik-the-postgresql-elephant-logo/">elephant🐘</a> in <a
                                href="https://www.postgresql.org/">PostgresSQL</a>, a&nbsp;
                                <a href="http://gimpchat.com/viewtopic.php?f=4&t=10265">wolf🐺</a> in a <a
                                href="https://www.gimp.org/">Gimp</a>...
                            </p>
                            <p>
                                But these are all mammals, moreover, vertebrates. <span className="spoiler">(khm, actually vertebrates are a
                                broader concept than mammals)</span>. How about something really spineless? I want to introduce
                                you a <a href="/physarum">Physarum</a>. First of all, it's a slime. Secondly, he knows how to find
                                the shortest paths on the graph.
                                <span className="horror-text">And what about you? How much time do you waste walking
                                    on sidewalks and bypassing the arches of lampposts?</span>
                                But more importantly, inspired
                                by small eukaryotes, you can write a beautiful agent-based visualization that has
                                nothing
                                in common with its progenitor.
                            </p>
                            <h3>
                                <span className="mw-headline" id="Pythagorean-tree">Pythagorean tree</span>
                            </h3>
                            <p>
                                Do you like fractals? I'm sure that yes, or you just don't know about them. There are
                                many interesting facts related to fractals like "but you knew yes, like what, like if
                                you fold the antenna into a fractal, yes it will catch better, yes." It can be cool, it
                                can be useful, but it is extremely distracting from what is really important. Fractals
                                are beautiful. God didn't give us a template-based brain to quickly distinguish faces or
                                notice patterns. Seriously, are you ready to get up, get dressed, go to the store, buy
                                cigarettes and stand smoking for five minutes, but don't you want to go pop up the&nbsp;
                                <a href="/tree">Pythagorean tree</a>🌳? <span className="void-text">Repent</span>.
                            </p>
                            <h2><span
                                className="mw-headline" id="Примечания">P.S.</span><span
                                className="mw-editsection"><span
                                className="mw-editsection-bracket">[</span><a

                                className="mw-editsection-visualeditor"
                                title="Редактировать раздел «Примечания»">править</a><span
                                className="mw-editsection-divider"> | </span><a

                                title="Редактировать раздел «Примечания»">править код</a><span
                                className="mw-editsection-bracket">]</span></span></h2>
                            <Postscript/>
                            <div className="reflist columns" style={{listStyleType: "decimal"}}>
                                <div className="mw-references-wrap">
                                    <ol className="references">
                                        {/*    TODO something fan */}
                                    </ol>
                                </div>
                            </div>
                            <h2><span
                                className="mw-headline" id="Литература">My tech stack</span><span
                                className="mw-editsection"><span
                                className="mw-editsection-bracket">[</span><a

                                className="mw-editsection-visualeditor"
                                title="good choice">advise me something</a><span
                                className="mw-editsection-divider"> | </span><a

                                title="bad choice">your skills is trash</a><span
                                className="mw-editsection-bracket">]</span></span></h2>
                            <ul>
                                <li>Golang <a
                                    className="internal mw-magiclink-isbn">ISBN 9781492077213</a>
                                </li>
                                <li>NodeJs + Typescript <a
                                    className="internal mw-magiclink-isbn">ISBN 9781800562523</a>
                                </li>
                                <li>Git <a
                                    className="internal mw-magiclink-isbn">ISBN
                                    9781430218333</a></li>
                                <li>Linux administration<a
                                    className="internal mw-magiclink-isbn">ISBN 978-5-907144-10-1</a></li>
                                <li>Python <a
                                    className="internal mw-magiclink-isbn">ISBN 9785496030687</a></li>
                                <li>SQL (prefer PostgresSql) <a className="internal mw-magiclink-isbn">ISBN
                                    978-1800567498
                                </a></li>
                                <li>Docker</li>
                                <li>Blockchain</li>
                                <li>AWS</li>
                            </ul>
                        </div>
                        <div className="printfooter" data-nosnippet="">Источник —
                        </div>
                    </div>
                    <div id="catlinks" className="catlinks" data-mw="interface">
                        <div id="mw-normal-catlinks" className="mw-normal-catlinks"><a
                            title="Служебная:Категории">Categories</a>:
                            <ul>
                                <li><a title="Really sussy, really nerd">Sussy nerds</a></li>
                                <li><a title="Category:Teapot instructions">Teapot instructions</a></li>
                                <li><a title="Category: Stone studio">"Stone" studio</a></li>
                                <li><a href="https://en.wikipedia.org/wiki/Category_of_topological_spaces"
                                       title="Category: Top">Top</a></li>
                                <li><a title="Category:Alvin and the chipmunks">Alvin and the chipmunks</a></li>
                                <li><a title="Категория:Кавалеры ордена Священного сокровища 4 класса">Emo culture</a>
                                </li>
                                <li><a title="Category: i really have a super nice straw hat">Toads in hats</a></li>
                                <li>
                                    <a
                                        className="new" title="Категория:Военные дирижеры (страница отсутствует)">Военные
                                        дирижеры</a>
                                </li>
                                <li><a title="Категория:Композиторы Франции">Композиторы Франции</a></li>
                                <li><a title="Категория:Композиторы Японии">Композиторы Японии</a></li>
                                <li><a title="Категория:Композиторы XIX века">Композиторы XIX века</a></li>
                                <li><a title="Категория:Композиторы XX века">Композиторы XX века</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div id="mw-navigation">
                <h2>Навигация</h2>

                <div id="mw-panel" className="vector-legacy-sidebar">
                    <div id="p-logo" role="banner">
                        <a className="mw-wiki-logo" title="Перейти на заглавную страницу"></a>
                    </div>

                    <nav id="p-navigation"
                         className="vector-menu mw-portlet mw-portlet-navigation vector-menu-portal portal"
                         aria-labelledby="p-navigation-label" role="navigation">
                        <h3 id="p-navigation-label" className="vector-menu-heading ">
                            <span className="vector-menu-heading-label">Навигация</span>
                        </h3>
                        <div className="vector-menu-content">

                            <ul className="vector-menu-content-list">
                                <li id="n-mainpage-description" className="mw-list-item"><a
                                    title="do nothing"
                                    accessKey="z"><span>This page</span></a></li>
                                <li id="n-content" className="mw-list-item"><a
                                    href="/physarum"><span>Physarum</span></a>
                                </li>
                                <li id="n-featured" className="mw-list-item"><a
                                    href="/tree"
                                    title="old but good"><span>Pythagorean tree</span></a>
                                </li>
                                <li id="n-sitesupport" className="mw-list-item"><a
                                    href="//donate.wikimedia.org/wiki/Special:FundraiserRedirector?utm_source=donate&amp;utm_medium=sidebar&amp;utm_campaign=C13_ru.wikipedia.org&amp;uselang=ru"
                                    title="do it"><span>Donate to wikipedia</span></a></li>
                            </ul>

                        </div>
                    </nav>


                    <nav id="p-participation"
                         className="vector-menu mw-portlet mw-portlet-participation vector-menu-portal portal"
                         aria-labelledby="p-participation-label" role="navigation">
                        <h3 id="p-participation-label" className="vector-menu-heading ">
                            <span className="vector-menu-heading-label">Social networks</span>
                        </h3>
                        <div className="vector-menu-content">

                            <ul className="vector-menu-content-list">
                                <li id="n-bug_in_article" className="mw-list-item"><a
                                    href="https://t.me/clickname"
                                    title="Prefered way to connect me"><span>Telegram</span></a>
                                </li>
                                <li className="mw-list-item"><a
                                    href="https://vk.com/clickname"
                                ><span>Vk.ru</span></a></li>
                                <li className="mw-list-item"><a
                                    href="mailto://ivan.vasilev.cn@gmail.com"
                                ><span>Mail to me</span></a></li>
                                <li className="mw-list-item"><a
                                    href="https://github.com/cl1ckname"
                                    title="My favorite social network"><span>Github</span></a>
                                </li>
                                <li className="mw-list-item"><a
                                    href="https://twitter.com/Cl1ckName"
                                    title="Or X.com??"><span>Twitter</span></a>
                                </li>
                                <li id="n-recentchanges" className="mw-list-item"><a
                                    href="https://shikimori.me/Ivan+Vasilev"
                                    title="russian <My anime list>"
                                    accessKey="r"><span>Shikimori</span></a></li>
                            </ul>

                        </div>
                    </nav>

                    <nav id="p-tb" className="vector-menu mw-portlet mw-portlet-tb vector-menu-portal portal"
                         aria-labelledby="p-tb-label" role="navigation">
                        <h3 id="p-tb-label" className="vector-menu-heading ">
                            <span className="vector-menu-heading-label">See also</span>
                        </h3>
                        <div className="vector-menu-content">

                            <ul className="vector-menu-content-list">
                                <li id="t-whatlinkshere" className="mw-list-item"><a
                                    title="Список всех страниц, ссылающихся на данную [alt-shift-j]"
                                    accessKey="j"><span>Ссылки сюда</span></a>
                                </li>
                                <li id="t-recentchangeslinked" className="mw-list-item"><a rel="nofollow"
                                                                                           title="Последние изменения в страницах, на которые ссылается эта страница [alt-shift-k]"
                                                                                           accessKey="k"><span>Связанные правки</span></a>
                                </li>
                                <li id="t-specialpages" className="mw-list-item"><a
                                    title="Список служебных страниц [alt-shift-q]"
                                    accessKey="q"><span>Служебные страницы</span></a>
                                </li>
                                <li id="t-permalink" className="mw-list-item"><a
                                    href="https://ru.wikipedia.org/w/index.php?title=%D0%9B%D0%B5%D1%80%D1%83,_%D0%A8%D0%B0%D1%80%D0%BB%D1%8C_(%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%B7%D0%B8%D1%82%D0%BE%D1%80)&amp;oldid=116880073"
                                    title="Постоянная ссылка на эту версию страницы"><span>Постоянная ссылка</span></a>
                                </li>
                                <li id="t-info" className="mw-list-item"><a

                                    title="Подробнее об этой странице"><span>Сведения о&nbsp;странице</span></a></li>
                                <li id="t-cite" className="mw-list-item"><a

                                    title="Информация о том, как цитировать эту страницу"><span>Цитировать страницу</span></a>
                                </li>
                            </ul>

                        </div>
                    </nav>

                    <nav id="p-wikibase-otherprojects"
                         className="vector-menu mw-portlet mw-portlet-wikibase-otherprojects vector-menu-portal portal"
                         aria-labelledby="p-wikibase-otherprojects-label" role="navigation">
                        <h3 id="p-wikibase-otherprojects-label" className="vector-menu-heading ">
                            <span className="vector-menu-heading-label">В других проектах</span>
                        </h3>
                        <div className="vector-menu-content">

                            <ul className="vector-menu-content-list">
                                <li className="mw-list-item"><a
                                    href="https://easstacademy.org/"
                                    hrefLang="en"><span>EASST academy</span></a></li>
                                <li id="t-wikibase"
                                    className="mw-list-item"
                                    style={{display: "list-item"}}><a
                                    href="https://dltc.spbu.ru/dcms"
                                    accessKey="g"><span>DCMS</span></a></li>
                            </ul>

                        </div>
                    </nav>


                    <nav id="p-lang" className="vector-menu mw-portlet mw-portlet-lang vector-menu-portal portal"
                         aria-labelledby="p-lang-label" role="navigation">                  <button className="uls-settings-trigger" title="Установки языка"></button>
                        <h3 id="p-lang-label" className="vector-menu-heading ">
                            <span className="vector-menu-heading-label">Speak with me in</span>
                        </h3>
                        <div className="vector-menu-content">

                            <ul className="vector-menu-content-list">
                                <li className="interlanguage-link interwiki-ru mw-list-item"><a
                                    title="я русский" lang="ru" hrefLang="ru"
                                    className="interlanguage-link-target"><span>Русский</span></a></li>
                                <li className="interlanguage-link interwiki-ja mw-list-item"><a
                                    title="anime" lang="ja" hrefLang="ja"
                                    className="interlanguage-link-target"><span>日本語</span></a>
                                </li>
                                <li className="interlanguage-link interwiki-en mw-list-item"><a
                                    title="english" lang="en" hrefLang="en"
                                    className="interlanguage-link-target"><span>English</span></a>
                                </li>
                            </ul>
                        </div>
                    </nav>

                </div>

            </div>

            <footer id="footer" className="mw-footer" role="contentinfo">
                <ul id="footer-info">
                    <li id="footer-info-lastmod"> This page was last edited on September 8, 2023, at 22:55.</li>
                    <li id="footer-info-copyright">please do not try to sue me for licking the appearance and all the
                        CSS
                        tables
                        from <a href="//wikipedia.org">Wikipedia</a>, this page is just a joke. Btw
                        Wikipedia®&nbsp;— registered trademark of a non-profit organization <a
                            href="//wikimediafoundation.org">Wikimedia Foundation, Inc.</a></li>
                </ul>

            </footer>
        </div>
    </>
}