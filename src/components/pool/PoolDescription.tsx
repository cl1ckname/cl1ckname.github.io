export default function PoolDescription() {
    return <div className={"description thin-scroll"}>
        <h1>Newton's pool.md</h1>
        <figure style={{float: "right", display: "inline-block", marginTop: "0"}}>
            <img src="https://i.imgur.com/y6ikwzr.png" alt="SPBU campus Mandelbrot's set"/>
            <figcaption>
                SPBU campus Mandelbrot's set<br/>
                (Fig. 1)
            </figcaption>
        </figure>
        <p>
            When it comes to fractals many people think of the <b>Mandelbrot set</b>. It is a really intricate thing,
            and even
            quite pop, as pop as a mathematical object can be. Every year in the center of our campus we plant a
            flowerbed in the form of a Mandelbrot set <i>(Fig. 1)</i>. It's really amazing in its variety. But I decided
            to <b>don't
            draw it</b>. Why is that? Most likely because too much attention has already been paid to the mandelbrot
            set.
            There are already a lot of ready explorers and videos like <q>zoom into mandelbrot set 10 hours</q> on the
            internet. <i>We're kind of underground here, yeah</i>. So here's another fractal for your attention - <b>Newton's
            pool</b>.
        </p>
        <p>
            Newton probably didn't realize he had such a wonderful pool. However, he guessed a lot of other interesting
            and
            useful things. In this case, we are interested in <b>Newton's method of finding roots</b>. It is quite
            simple, you
            may have even heard of it at school. It is an iterative process of converging to one of the roots of a
            curve. To do this, we need to know the values of the function at the points and the values of its
            derivative. The formula for this process is <code> x<sub>i+1</sub> = x<sub>i</sub> -
            x<sub>i</sub>/x<sub>i</sub>'</code>. It's really not difficult. It can even
            be given the following geometric interpretation - at each step of the iterative process we draw the curve at
            a point, see its intersection with the X axis and repeat the calculations from this point. In the vicinity
            of the root, the steps will become extremely small and we will hit one of the roots.
        </p>
        <figure style={{float: "left", display: "inline-block", marginTop: "0"}}>
            <img alt="Neton method geometry representation" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Newton_iteration.svg/300px-Newton_iteration.svg.png"/>
            <figcaption>
                Neton method geometry representation<br/>
                (Fig.2)
            </figcaption>
        </figure>
        <p>
            But what does this have to do with the topic of fractals and the resulting picture? It takes a little more
            math. Have you heard anything about <b>complex numbers</b>? If not, read it yourself, this is not an algebra
            course. If you have an idea of what complex algebra is, it's cool. Let me remind you of a fact that is
            majestically called <b>The main theorem of algebra</b>. Its essence is that a polynomial of degree N has
            exactly
            N roots, <i>possibly complex</i>. Mewover, if it is a polynomial of the form x<sup>N</sup> - 1, then all
            its roots
            are
            uniformly located on the unit complex circle. Here is another fact - <b>Newton's method also works for
            complex
            numbers</b>. See where this is going? We will represent our screen as a complex plane and run Newton's
            process
            for each pixel on the screen. After a certain number of iterations, we will see which of the N roots we are
            closest to and paint the pixel in the color of that root.
        </p>
        <p>
            The reader sophisticated in industrial fractal production will notice the parallels with the method of
            constructing a set of Mandelbrot. In general, all algebraic fractals are constructed in the same way. It is
            also possible to construct&nbsp;
            <a href="https://en.wikipedia.org/wiki/Julia_set">Julia's set</a> and&nbsp;
            <a href="https://en.wikipedia.org/wiki/Burning_Ship_fractal">Burning Ship</a> and&nbsp;
            <a href="https://en.wikipedia.org/wiki/Tricorn_(mathematics)">Tricorn</a>.
        </p>
        <h2>Implementation details</h2>
        <p>
            Compared to the rest of the tops on this site the mandelbrot set is the most uncomplicated to build. I'm
            using <a href="https://webglfundamentals.org/webgl/lessons/">WebGl</a>, and a <b>fragment shader</b>. Who
            did not know <s>(that silly hee hee hee hee)</s> fragment shader is
            a
            program that is executed <i>for each pixel on the screen</i> and as a result of its execution says in what color
            should be painted pixel. <b>Gosh</b>, it's like <b>shaders are specifically made for algebraic fractals</b>,
            isn't it?
            Well, it's really convenient, but there's a little problem. Everything could be much cooler if not for the
            accuracy of rounding floating point numbers. Precisely because floating-point numbers have a limited (and
            relatively small) number of symbols after the point when zooming, everything at some point falls into a mess
            of squares. And then there's that awful monotonous circle in the middle. As a variant to write Big Float
            directly on <a href="https://www.khronos.org/opengl/wiki/Core_Language_(GLSL)">GLSL</a>, but so far the
            hands have not reached. If someone wants to support me in this I will be
            very glad.
        </p>
    </div>
}