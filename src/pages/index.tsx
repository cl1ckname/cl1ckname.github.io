import "../styles/wiki.css"
import "../styles/homepage.css"
import FlipText from "@/components/homepage/flipText";
import Head from "next/head";
import { Bungee_Spice, VT323 } from "next/font/google"
import Postscript from "@/components/homepage/postscript";
import WaveText from "@/components/homepage/waveText";

const bungee = Bungee_Spice({ subsets: ['latin'], weight: "400" })
const vt323 = VT323({ subsets: ['latin'], weight: "400" })

export default function MainPage() {
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
					<img src="/images/pepe_dance.gif" className="gif-emoji" alt="sad pepe" />
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

							className="mw-editsection-visualeditor">hey you</a><span
								className="mw-editsection-divider"> | </span><a>what are you doing here?</a><span
									className="mw-editsection-bracket">]</span></span>
					<div id="siteSub" className="noprint">Content from my head - free encyclopedia</div>
					<div id="contentSub">
						<div id="mw-content-subtitle">
							<div id="mw-fr-reviewnotice" className="plainlinks flaggedrevs_preview">I'm too lazy to
								update
								this page,
								the information may not be up-to-date.
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
												href="/images/me_and_ducks.jpeg" className="mw-file-description"><img alt="me and ducks"
													src="/images/me_and_ducks.jpeg"
													decoding="async"
													width="274"
													height="397"
													className="mw-file-element"
													data-file-width="480"
													data-file-height="696" /></a></span>
											<span data-wikidata-qualifier-id="P2096" className="media-caption"
												style={{ display: "block" }}>me and who? <br />(there's a duck, but you can't see it)</span>
										</td>
									</tr>
									<tr>
										<th scope="row" className="plainlist">Born</th>
										<td className="plainlist">
											<span className="nowrap"><a title="29 November">29 November</a> <a
												title="2002y">2002</a></span><br />
											<span><a title="Penza">Penza</a></span>
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
													data-file-height="600" /></span></span>&nbsp;<span
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
												href="https://www.rajnikantvscidjokes.in/wp-content/uploads/2015/12/trst-me-600x310.png">
												Software engineer</a></span></span>,
											<span><span><a
												href="https://img.ifunny.co/images/305c06d271ad30e373074132fd083e43671f00b544fa6ba5d6d1a397104d26ed_1.jpg">
												math student</a></span></span>,
											<span><span><a
												href="https://img.buzzfeed.com/buzzfeed-static/static/2017-03/13/6/asset/buzzfeed-prod-fastlane-03/sub-buzz-25012-1489401746-1.jpg">
												toad enjoyer</a></span></span></td>
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
								<img src="/images/cv.png" decoding="async" width="260"
									alt="computer vision experiments"
									height="174" className="mw-file-element" />
								<figcaption>Me while computer vision experiments
									(v̨͔͖̪̟͊̓o͙̻̞̩̩̠̺̽͘ͅi̟̤̥͎͈̥̪͋͗͘d̷͍̭̙̲͚̫͇̘͛ͩͩ̓e̙̭͓̼͕ͩ̐́ͅd̜̯͍̩̝͎͑̋̿̀͘ͅ)
								</figcaption>
							</figure>
							<p><b>Ivan Vasilev</b> (<a>ru.</a>&nbsp;<span lang="ru" style={{ fontStyle: "italic" }}>Иван Васильев</span>;
								<a title="29 November"> 29 November</a> <a className="mw-redirect"
									title="2002">2002</a>, <a
										title="Penza">Penza</a>) — <a title="pm pu">mathematician student </a>, a <s>reduced commands language</s> Golang developer, crypto researcher, a man of his
								time, the ideal tradwife,
								the only person in Russia who got out of the wheel of <a
									href="https://i.pinimg.com/736x/bf/58/1f/bf581fff5caeda725b40248219bd6921.jpg">Samsara</a>.
								Found a metanarrative,
								but
								does not
								show or tell anyone about it. Alive SAT solver. Best esoteric bimbo gf. Hello
								dear anon
								<img className="gif-emoji" src="/images/bulbasaur.gif" alt="lazy bulbasaur" />
							</p>
							<div id="toc" className="toc" role="navigation" aria-labelledby="mw-toc-heading"><input
								type="checkbox"
								role="button"
								id="toctogglecheckbox"
								className="toctogglecheckbox"
								style={{ display: "none" }} />
								<div className="toctitle" lang="en" dir="ltr"><h2 id="mw-toc-heading">Contents</h2><span
									className="toctogglespan"><label className="toctogglelabel"></label></span>
								</div>
								<ul>
									<li className="toclevel-1 tocsection-1"><a><span
										className="tocnumber">1</span>
										<span className="toctext">Why did I create this page</span></a></li>
									<li className="toclevel-1 tocsection-2"><a><span
										className="tocnumber">2</span> <span
											className="toctext">CS interests</span></a></li>
									<li className="toclevel-1 tocsection-3"><a><span
										className="tocnumber">3</span>
										<span className="toctext">Fun content here</span></a>
										<ul>
											<li className="toclevel-2 tocsection-4"><a
												href="/physarum"><span
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
									<li className="toclevel-1 tocsection-5"><a><span
										className="tocnumber">4</span> <span
											className="toctext">P.S.</span></a></li>
									<li className="toclevel-1 tocsection-6"><a><span
										className="tocnumber">5</span> <span
											className="toctext">My tech stack</span></a></li>
								</ul>
							</div>

							<h2><span
								className="mw-headline" id="Общие_сведения">Why did I create this page🤔</span><span
									className="mw-editsection"><span
										className="mw-editsection-bracket">[</span><a

											className="mw-editsection-visualeditor"
											title="hey you">i don't care</a><span
												className="mw-editsection-divider"> | </span><a

													title="weak aura">who asked?</a><span
														className="mw-editsection-bracket">]</span></span></h2>
							<p>Initially, I just had a site dedicated to fractals, I was <b>interested</b> in drawing
								them
								and
								giving my friends the opportunity to do it <FlipText>interactively</FlipText>. However,
								it
								soon became clear that
								there are not so many amazing fractals, just drawing various L-systems is not so
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
								Sounds so so😒. What is even more depressing <img src="/images/sad-pepe.gif"
									className="gif-emoji" /> is that this
								site is not the answer to this
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

											className="mw-editsection-visualeditor">cs is already interest</a><span
												className="mw-editsection-divider"> | </span><a>who are you bragging to?</a><span
													className="mw-editsection-bracket">]</span></span>
							</h2>
							<p>It has long been so customary that I am engaged in backend. Why? It just seems to me that
								the
								backend gives more various tasks, and the study of the backend itself is much more
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
									<span style={{ color: "pink", textShadow: "0em -0.8em black" }}> funny</span></span><span
										className="mw-editsection"><span className="mw-editsection-bracket">[</span><a

											className="mw-editsection-visualeditor">pretty boring</a><span
												className="mw-editsection-divider"> | </span><a>nerd stuff</a><span
													className="mw-editsection-bracket">]</span></span></h3>
							<figure className="mw-halign-left" typeof="mw:File/Thumb"><a
								href="/images/someone.png"
								className="mw-file-description"><img
									alt="it's me"
									src="/images/someone.png"
									decoding="async" width="180" height="289" className="mw-file-element"
									data-file-width="750"
									data-file-height="1204" /></a>
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
								information, I began to stumble upon more and more mindblowing solutions. Computer
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
							</p>
							<p>
								I am also very impressed <img alt="Midoria lmao" src="/images/impression.gif"
									className="gif-emoji" /> and
								fascinated by everything related to data storage.
								Archivers,
								data structures, file systems. Walking in the forest of binary trees is very
								breathtaking. My
								favorites are the <a href="https://en.wikipedia.org/wiki/Van_Emde_Boas_tree">Van Emde
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
								<div className={"window"} style={{ display: "block" }}>
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
										<img src="/images/gopher-dance.webp" alt="chainsaw man dance gif" width={192}
											height={192} />
										<br />
										<span>me when i... sorry,<br /> i lied, i never</span>
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

											className="mw-editsection-visualeditor">cool and amazing</a><span
												className="mw-editsection-divider"> | </span><a>i'm gonna see every page</a><span
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
									broader concept than mammals)</span>. How about something really spineless? I want to
								introduce
								you a <a href="/physarum">Physarum</a>. First of all, it's a slime. Secondly, he knows
								how to find
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
								many interesting facts related to fractals like "but you knew yeah, like what, like if
								you fold the antenna into a fractal, yeah it will catch better, yeah." It can be cool,
								it
								can be useful, but it is extremely distracting from what is really important. Fractals
								are beautiful. God didn't give us a <a href="/images/pattern-seeking-brain.jpg">pattern-seeking brain</a> to quickly distinguish faces or
								notice patterns. Seriously, are you ready to get up, get dressed, go to the store, buy
								cigarettes and stand smoking for five minutes, but don't you want to go pop up the&nbsp;
								<a href="/tree">Pythagorean tree</a>🌳? <span className="void-text">Repent</span>.
							</p>
							<h3>Newton's pool</h3>
							<figure className="mw-halign-left" typeof="mw:File/Thumb"><a
								href="/images/pcg.webp"
								className="mw-file-description"><img
									alt="newton pool center rotation"
									src="/images/pcg.webp"
									decoding="async" width="240" height="240" className="mw-file-element"
									data-file-width="750"
									data-file-height="1204" /></a>
								<figcaption>Newton pool looks yummy</figcaption>
							</figure>
							<p>
								Geometric fractals are C😎😎L. They're simple, and in their simplicity they're beautiful.
								They were discovered (or invented🤔) a long time ago, because all you needed to build
								them
								was drawing tools. But there is something that became available to the human eye only
								thanks to <WaveText text={"modern computing technologies"} />. We are talking about
								algebraic fractals<img alt="Hey, there's supposed to be a picture here, where is it?"
									src="/images/hypnosis.gif"
									className="gif-emoji" />. They
								are mostly built on the complex plane. Complex numbers are quite a
								s<sub>t</sub><sup>r</sup><s>a</s><b>n</b><i>g</i>e thing,
								counterintuitive and therefore harboring <a
									href="https://cs8.pikabu.ru/post_img/2016/01/18/6/1453109508170640358.jpg">many
									surprises</a>. Out of many different algebraic
								fractals, I chose one that I found most interesting. First of all, it has a simple
								interpretation, so when you look at it, you see some rational things. Secondly it is
								neglected, there are only a few pictures on the internet and no explorers <img
									src="https://emoji.discadia.com/emojis/316bcf0d-e4ee-48ab-98af-0a8cbe0360e9.PNG"
									className="gif-emoji" alt="Hey, there's supposed to be a picture here, where is it?" />.
								So I
								decided to make one myself. So everyone is encouraged to look, try and explore Newton's
								pools! Moreover, this became <a href="https://github.com/cl1ckname/newton-pcg">my graduate diploma</a>.
							</p>
							<h2><span
								className="mw-headline" id="Fun-content-here">Other things I made</span><span
									className="mw-editsection"><span
										className="mw-editsection-bracket">[</span><a
											className="mw-editsection-visualeditor">star this stuff on github</a><span
												className="mw-editsection-divider"> | </span><a>you're changed my life</a><span
													className="mw-editsection-bracket">]</span></span>
							</h2>
							<h3>
								<span className="mw-headline" id="Physarum">Shadxel</span></h3>

							<p>
								<figure typeof="mw:File/Thumb">
									<img src="/images/noncence.jpg" decoding="async" width="260"
										alt="computer vision experiments"
										height="174" className="mw-file-element" />
									<figcaption>
										🔴 Live <span className="voxel-text">voxel</span>  reaction.
									</figcaption>
								</figure>
								The duality of data and behavior has always seemed to me to be a fundamental principle of all computer technologies. We can observe this everywhere—in how opcodes are transformed into behavior by a virtual machine. In how neural network weight matrices are transformed into AI slop. In how a set of rendering instructions is transformed into SVG images. Let's focus on the latter. We have two types of images: raster and vector. Raster images are simply data about each pixel. Vector images are a set of instructions for rendering the desired image. At the same time, raster images are much more common—naturally, because our photos are too complex to be described with a couple of graphics. The joke is that in 3D, it's just the opposite—all 3D models are vector objects. They are a set of rules for their construction. But what would be the analogue of raster graphics in 3D? <span className="voxel-text">Voxels</span>, of course! I find all topics that mention <span className="voxel-text">voxels</span> in any way to be very interesting. They are simply not used for boring stuff. So I decided to keep up and create an engine for rendering voxel objects using Lua scripts. <a href="https://github.com/cl1ckname/shadxel">Go and draw something!</a>
							</p>
							<h3>CDF ▄︻テ══━一💥</h3>
							<p></p>
							<h2><span
								className="mw-headline" id="Примечания">P.S.</span><span
									className="mw-editsection"><span
										className="mw-editsection-bracket">[</span><a

											className="mw-editsection-visualeditor"
											title="Редактировать раздел «Примечания»">nooo, you are leaving so fast?</a><span
												className="mw-editsection-divider"> | </span><a

													title="Редактировать раздел «Примечания»">stay with us a little longer</a><span
														className="mw-editsection-bracket">]</span></span></h2>
							<Postscript />
							<div className="reflist columns" style={{ listStyleType: "decimal" }}>
								<div className="mw-references-wrap">
									<ol className="references">
										{/*    TODO something fan */}
									</ol>
								</div>
							</div>
						</div>
						<div className="printfooter" data-nosnippet="">Источник —
						</div>
					</div>
					<div id="catlinks" className="catlinks" data-mw="interface">
						<div id="mw-normal-catlinks" className="mw-normal-catlinks"><a
							title="Служебная:Категории">Inspired by | thanks to</a>:
							<ul>
								<li><a title="Great channel, awesome man"
									href="https://www.youtube.com/c/foo52ru">foo52</a></li>
								<li><a
									title="one of the first people who opened my eyes to the fact that programming isn't just about business stuff."
									href="https://www.youtube.com/@vectozavr">Vectozavr</a>
								</li>
								<li><a title="best sci-fi on russian youtube"
									href="https://www.youtube.com/@OnigiriScience">Onigiri</a></li>
								<li><a title="Thanks for your graphics experements, i love gatari too"
									href="https://www.youtube.com/@Acerola_t">Acerola</a></li>
								<li><a href="https://www.youtube.com/@SebastianLague/videos"
									title='"Code adventure" is great, i feel same way'>Sebastian Lague</a></li>
								<li><a title="dude knows exactly what computers are for"
									href="https://www.youtube.com/@PezzzasWork">Pezzza's Work</a></li>
								<li><a title="my guys" href="https://vk.com/stone_studio">"Stone" studio</a></li>
								<li><a title="thx for your videos and experements"
									href="https://www.youtube.com/@StandaloneCoder/featured">Standalone coder</a>
								</li>
								<li><a title="Category: i really love toads"
									href="https://www.youtube.com/watch?v=N85LzPVJzDQ">Toads in hats</a></li>
								<li><a title="The channel that pushed me to learn programming."
									href="https://www.youtube.com/@eliteclubsessions">EliteClubSessions</a></li>
								<li><a title="thank you for your interest in shaders and shadertoy"
									href="https://www.youtube.com/@InigoQuilez">Inigo Quilez</a></li>
								<li><a title="make me insipred after long break; nice blog"
									href="https://www.youtube.com/@Softology">Softology</a></li>
								<li><a title="some of foo52's videos are translations of this dude's videos."
									href="https://www.youtube.com/@wallcraft-video/videos">Simulife Hub</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<div id="mw-navigation">
				<div id="mw-panel" className="vector-legacy-sidebar">
					<div id="p-logo" role="banner">
						<a className="mw-wiki-logo" title="Это мой почти настоящий портрет"></a>
					</div>

					<nav id="p-navigation"
						className="vector-menu mw-portlet mw-portlet-navigation vector-menu-portal portal"
						aria-labelledby="p-navigation-label" role="navigation">
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
								<li id="n-featured" className="mw-list-item"><a
									href="/pool"
									title="uwu"><span>Newton pool</span></a>
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
									href="https://github.com/cl1ckname"
									title="My favorite social network"><span>Github</span></a>
								</li>
								<li className="mw-list-item"><a
									href="mailto://ivan.vasilev.cn@gmail.com"
								><span>Mail to me</span></a></li>
								<li className="mw-list-item"><a
									href="https://twitter.com/Cl1ckName"
									title="Or X.com??"><span>Twitter</span></a>
								</li>
								<li id="n-recentchanges" className="mw-list-item"><a
									href="https://shikimori.me/Ivan+Vasilev"
									title="russian <My anime list>"
									accessKey="r"><span>Shikimori</span></a></li>
								<li><a href="https://leetcode.com/20002mc/">
									<span>LeetCode</span>
								</a></li>
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
								<li className="mw-list-item"><a href="https://math.hws.edu/eck/js/mandelbrot/MB.html">
									<span>Beauty Mandelbrot explorer</span></a>
								</li>
								<li className="mw-list-item"><a
									href="https://anvaka.github.io/fieldplay/">
									<span>Vector fields viewer</span></a>
								</li>
								<li className="mw-list-item"><a href="https://tariqksoliman.github.io/Fractal-Inferno/">
									<span>Fractal flame</span></a>
								</li>
								<li className="mw-list-item"><a href="https://azgaar.github.io/Fantasy-Map-Generator/">
									<span>Fantasy map generator</span></a>
								</li>
								<li className="mw-list-item"><a href="https://jaxry.github.io/wave-function-collapse/">
									<span>Wave function collapse</span></a></li>
							</ul>

						</div>
					</nav>

					<nav id="p-wikibase-otherprojects"
						className="vector-menu mw-portlet mw-portlet-wikibase-otherprojects vector-menu-portal portal"
						aria-labelledby="p-wikibase-otherprojects-label" role="navigation">
						<h3 id="p-wikibase-otherprojects-label" className="vector-menu-heading ">
							<span className="vector-menu-heading-label">In other projects</span>
						</h3>
						<div className="vector-menu-content">

							<ul className="vector-menu-content-list">
								<li className="mw-list-item"><a
									href="https://plsr.ru/"
									hrefLang="ru"><span>Pulsar</span></a></li>
								<li className="mw-list-item"><a
									href="https://sigma-school.su/"
									hrefLang="ru"><span>SIGMA school</span></a></li>
								<li className="mw-list-item"><a
									href="https://easstacademy.org/"
									hrefLang="en"><span>EASST academy</span></a></li>
								<li className="mw-list-item"
									style={{ display: "list-item" }}><a
										href="https://dltc.spbu.ru/dcms"
										accessKey="g"><span>DCMS</span></a></li>
								<li className="mw-list-item"><a href="https://shard.ru/about">
									<span>SHARD</span></a>
								</li>
							</ul>

						</div>
					</nav>


					<nav id="p-lang" className="vector-menu mw-portlet mw-portlet-lang vector-menu-portal portal"
						aria-labelledby="p-lang-label" role="navigation">
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
					<li id="footer-info-lastmod"> This page was last edited on August 21, 2025, at 01:21.</li>
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