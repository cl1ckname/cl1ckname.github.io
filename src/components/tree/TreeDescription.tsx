export default function TreeDescription() {
    return <div className={"description thin-scroll"}>
        <h1>Pythagorean_tree.md</h1>

        <figure style={{float: "right", display: "inline-block", marginTop: "0"}}>
            <img alt="Pythagorean pants"
                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Pythagorean.svg/220px-Pythagorean.svg.png"/>
            <figcaption>Pythagorean pants (Fig. 1)</figcaption>
        </figure>
        <p>
            Probably the Pythagorean theorem is the <b>most memorable</b> theorem from the school geometry course.
            a<sup>2</sup> + b<sup>2</sup> =
            c<sup>2</sup> - easy to remember, easy to apply. As they say in Russia, <q>Pythagorean trousers are equal in
            all
            directions.</q> It sounds <i>rhyming</i> with us. Pythagorean pants we call the figure that was used by
            Pythagoras
            to
            prove his theorem (Fig. 1). The theorem itself is a special case of the cosine theorem. This is my favorite
            theorem, because it is the first theorem of which I have deduced myself.
        </p>
        <p>
            This kind of figure led one clever man in the 20th century to create an intricate pattern that we now know
            as the <b>Pythagorean tree</b>. The <i>Pythagorean tree is not a fractal in the meaning of Mandelbrot, since
            its
            topological and Hausdorff dimension is 2</i>. However, according to the method of construction and
            appearance,
            it is quite a fractal, so we will consider it as such.
        </p>
        <p>
            What attracts me most about it is that firstly it is a complete <b>binary tree</b>, and as I have already
            written
            binary trees are <i>very cool</i>, and secondly there are several ways to build it. I have tried to provide
            all
            possible settings for the user.
        </p>
        <code style={{fontSize: "1.5em"}}>
            ATTENTION BE CAREFUL, DRAWING A TREE WITH A LARGE ITERATIONS NUMBER MAY CAUSE THE PAGE
            TO HANG.
        </code>
        <h2>The method of drawing</h2>
        <figure style={{float: "right", display: "inline-block", marginTop: "0"}}>
            <img src="/square-enumerate.png" alt="square vertices enumeration"/>
            <figcaption>Square vertices enumeration (Fig. 2)</figcaption>
        </figure>
        <p>
            We will have two lists, in the code they are called <b>nodes</b> and <b>leaves</b>. Leaves are drawn and
            moved to the node
            list. Each element in the node list spawns two leaves, which are put into the list. This allows us not to
            keep the entire list of squares in memory (but only half, because each iteration doubles the number of
            elements). The first square is drawn as a regular square. <i>I hope you can handle it yourself</i>. The main
            thing
            is to number the vertices in the correct order (Fig. 2).
        </p>
        <figure style={{float: "left", display: "inline-block", marginTop: "0"}}>
            <img src="/square-enumerate-2.png" alt="square vertices enumeration" style={{width: "200px"}}/>
            <figcaption>Square vertices enumeration <br/>(Fig. 3)</figcaption>
        </figure>
        <p>
            It is entered into the list of leaves. It is drawn and moved
            to the list of nodes. Then two new squares are built on its basis as follows. The points P<sub>0</sub> and P<sub>1</sub> are
            taken.
            At the middle of the segment between these two points the point P<sub>C</sub> is taken. Then the point 1 is
            rotated
            around the point P<sub>C</sub> by double angle. Let's call this point T. The segments P<sub>0</sub>-T and
            P<sub>1</sub>-T form the bases for
            the new squares. Calculate the lengths of the segments. Let us call them LDV and RDV. Now we need to
            continue the left segment to the right by RDV length and the right segment to the left by LDV length. Then
            we number the points as in
            Fig. 3.
        </p>
        <p>
            Thus repeating this construction for each leaf and transferring the leaf to the list by a node we get a
            <b>marvelous</b> Pythagorean tree. At this stage the angle of rotation is important to obtain the point T.
            Technically, it is one of the angles of a right triangle (<i>obviously not the right angle</i>). The other
            angle is
            equal to π/2. This parameter affects the slope of the tree, and the size of its right and left subtrees.
            The size is respectively size*sin(A) for the left and size*cos(A) for the right. <b>Interesting fact</b>!
            The
            sums of areas of all squares in each generation are equal! <i>So cool</i>!
        </p>
        <h2>Optimization</h2>
        <p>
            Since the number of squares <b>doubles with each iteration</b>, computing and drawing the tree can become a
            <i>drudgery</i>. In the last version I used <a href="https://pixijs.com/">Pixi.JS</a> and their geometry
            triangulation, but it was too long, although
            it gave results in vector graphics. This time I decided to refuse any third party libraries except <a
            href="https://nextjs.org/">Next.Js</a>,
            so I decided to work with a simple <a
            href="https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D">Canvas 2d</a>. The first
            optimization I've already described is the
            use of
            two lists so that I don't have to store already drawn squares. This gave an excellent performance gain due
            to faster work with lists and reduced load on the garbage collector. But it is not enough! If you write
            data-heavy web applications, <a href="https://developer.mozilla.org/docs/Web/JavaScript/Guide/Typed_arrays">typed
            arrays</a> are your <b>best friends</b>. What's the point of them? Because
            they are
            not linked lists like arrays in JS, but contiguous chunks in memory. Access by index is done in O(1).
            Also, iteration is <i>many times faster</i>. But they have a limitation - such arrays are very poorly
            expandable.
            You can even say that they are not expandable at all, they have to be copied completely. But in our case it
            is not a problem, because we know exactly how many squares we will have. Thus, by calculating the size of
            the array in advance depending on the number of iterations we get access to any square by index for O(1),
            iteration for O(n), and clearing for O(1) (we just set the length value to 0).
        </p>
        <p>
            We could have come up with many more mathematical optimizations, but it turned out to be rather useless,
            since the profiler showed that most of the time was spent on rendering the tree. This is a real problem. I
            tried <i>several approaches</i> to drawing - SVG, drawing + applying the
            affine <code>setTransformationMatrix()</code>, using
            rotation + <code>fillRect()</code> (works much faster than filling the path), but still drawing directly in
            the displayed
            space turned out to be the fastest and most correct approach. If not....
        </p>
        <p>
            He would not have to re-draw every section of the path when trying to approach or move a tree. It's
            unbearably long, and it's like it's completely useless. The picture stays the same, it just moves, can't you
            just move the drawing as a picture on a canvas? This is where we enter the territory
            of <code>getImageData()</code>,
            <code>drawImage()</code> and <code>willReadFrequency</code>. You can unload all the pixels of the picture
            from the canvas into
            the <code>ImageData</code> object and then draw it again, applying scale and translate. The only problem is
            that <code>putImageData()</code>
            does not react to transformations, and <code>drawImage()</code> does not erase the old drawing. There
            was <i>another problem</i> -
            if the tree went beyond the canvas boundaries, it was simply erased, and when we moved it, we saw only a
            stump of a tree.
        </p>
        <p>
            Both of these problems are solved by adding a <b>second canvas</b>. And the size is several times larger
            than the
            original one. In this way, the larger canvas ensures that the tree drawing is not cropped and that the tree
            can be redrawn from it without duplication and using transformations. It is not necessary to display the
            second canvas at all! Moreover, it turns out that the Canvas API has a special
            setting <code>willReadFrequency</code> that
            optimizes the unloading of <code>ImageData</code> from the canvas. <mark>This approach allowed us not only
            to
            solve some
            engineering problems, but also to increase the quality of the image by increasing the rendering
            resolution</mark>.
        </p>
        <h2>Settings</h2>
        <ol>
            <li>
                <dt>Iterations</dt>
                <dd>
                    The number of iterations determines how deep the tree gets. The number of squares is 2<sup>n</sup> -
                    1 where n is
                    the number of iterations (Don't believe me? Check it yourself!). But be careful, because exponential
                    growth is very fast, and it is 32 times easier to render 10 iterations than 15.
                </dd>
            </li>
            <li>
                <dt>Angle</dt>
                <dd>
                    One of the acute angles of triangles. Determines the slope of the tree and the size of the subtrees.
                    Very simple to understand, but a very significant parameter.
                </dd>
            </li>
            <li>
                <dt>Branch long</dt>
                <dd>
                    I've written everywhere about squares, but this option changes the rules of the game! Extend your
                    squares into rectangles making the tree taller and more graceful!
                </dd>
            </li>
            <li>
                <dt>Alternation</dt>
                <dd>
                    I'm not sure if this is the correct name for this parameter, but so be it. Its essence is that it
                    swaps the angles of the triangles after a generation, thus obtaining a new pattern.
                </dd>
            </li>
            <li>
                <dt>Wobbling</dt>
                <dd>
                    As we all know, the wind blows because the trees sway. We should rock this tree too. In fact, there
                    are two parameters here - amplitude and frequency. They set the strength and speed of tilting of
                    each rectangular bar depending on time. This way it looks like the tree is swaying. Beauty!
                </dd>
            </li>
            <li>
                <dt>Color</dt>
                <dd>
                    my favorite Kandinsky argued that there is nothing more important than color, and I agree with him.
                    I carried over the old colors. Some of them are just random mathematical operations modulo
                    2<sup>32</sup>.
                    Others have gradients from <a href="https://uigradients.com">uigradients.com</a>.
                </dd>
            </li>
        </ol>
        <h2>A little more about color</h2>
        <figure style={{float: "right", display: "inline-block", marginTop: "0"}}>
            <img src={"/tree-enumerate.png"} alt={"squares enumeration"} style={{width: "20em"}}/>
            <figcaption>Squares enumeration (Fig. 4)</figcaption>
        </figure>
        <p>
            I never tire of expressing my love for binary trees and the binary number system, so here are a couple more
            facts that I use in the process of calculating the color of a tree. It turns out that the vertices of binary
            trees are very convenient to number. This is done as follows - for simplicity, let the first element be
            number one. The left element is obtained by multiplying the current number by two, and the right element by
            multiplying the current by two and adding one. Thus, we close the entire space of integers from 1 to
            2<sup>n</sup> where n is the number of iterations. But why is that? You can answer as follows. Let's
            consider the binary
            system and obtaining numbers in it. We will receive new numbers by adding 0 or 1 to the end of existing
            ones.
        </p>
        <p>
            Here we have 0. At the end of it we can assign 0<sub>2</sub> or one, getting 00<sub>2</sub> and
            01<sub>2</sub>, respectively. 00<sub>2</sub> = 0<sub>10</sub>, 01<sub>2</sub> = 1<sub>10</sub>.
            Moving on - you can assign 0 or 1 to one, getting 10<sub>2</sub> = 2<sub>10</sub> or 11<sub>2</sub> =
            3<sub>10</sub>. From 10<sub>2</sub> we get 100<sub>2</sub>=4<sub>10</sub> and 101<sub>2</sub>=5<sub>10</sub>.
            Then I
            think you understand the meaning. An example in Fig. 4. And vice versa - to find out the parent of a
            vertex, we need to completely divide its number by 2. This is equivalent to erasing the last digit. To find
            out the depth of a vertex, just take the base 2 logarithm of its number and round down. Amazing.
            By arranging the vertices, they can be assigned a color according to a linear gradient, just like the Flare
            and Witching hour colors do.
        </p>
    </div>
}