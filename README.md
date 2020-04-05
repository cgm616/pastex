PasTeX
======

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/cgm616/pastex/build-and-deploy) ![Website](https://img.shields.io/website?down_message=offline&label=demo&up_color=blue&up_message=online&url=https%3A%2F%2Fpastex.cgm616.me)

PasTeX is an online clipboard specifically meant to share math written in LaTeX.

When you create a new paste, any LaTeX in the input surrounded by math-mode tags will be rendered in the browser by [KaTeX](https://katex.org/), resulting in beautiful, easy to share online math.
PasTeX is aimed to solve a problem I've run up against over and over, and especially so during the COVID-19 pandemic: how can I effectively share math over the internet when communicating through a medium that doesn't support LaTeX?

How to use
----------

Once you navigate to [PasTeX](https://pastex.cgm616.me), simply add any text you want to the sharing text area.
If you want to include math in your paste, surround it with `\(` or `$` for inline mode and `\[` or `$$` for display mode.

For example, the following input produced [this paste](https://pastex.cgm616.me/?id=2gHn):

```latex
Welcome to PasTeX! Here, we can do inline math like $\int f(x) dx$ and display mode math like $$\sum_{n\in\mathbb{N}} a_n .$$
White space is also respected, and display mode math is treated just like display mode in LaTeX.
More complicated math is also supported, like the following:

$$ \delta_{i, j} =
    \begin{cases}
      1, & i=j,\\
      0, & i\not= j.\\
    \end{cases}$$
```

A full list of supported LaTeX functions and symbols can be found at the [KaTeX documentation](https://katex.org/docs/supported.html).
Suffice it to say that most anything you might want to use in math-mode is supported.

Contributing
------------

If you want to help make PasTeX better, feel free to open issues or a pull request!
All help is appreciated.

License
-------

PasTeX is MIT-licensed.
The full text of the license can be found in the `LICENSE` file in the root of this repository.
