import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`

/* Global Styling */

*,
*::before,
*::after {
    box-sizing: border-box;
}

:root {   
    --bs-accent1: 2px 5px 10 rgb(52, 176, 95, .52);
    --bs-accent1-light: 2px 5px 10 rgb(52, 176, 95, .29);
    --bs-accent2: 2px 5px 10px rgb(252, 136, 139, .66);
    --bs-accent2-light: 2px 5px 10px rgb(252, 136, 139, .9); 

    --clr-accent1: rgb(67, 206, 157, 1);
    --clr-accent1-light: rgb(238, 252, 245, 1);  
    --clr-accent2: rgb(252, 136, 139, 1);
    --clr-accent2-light: rgb(254, 216, 217, 1);
    --clr-dark: rgb(112, 112, 112, 1);

    --ff-primary: 'Nunito Sans', sans-serif;

    --ff-extralight: 200;
    --ff-light: 300;
    --ff-regular: 400;
    --ff-semibold: 600;
    --ff-bold: 700;
    --ff-extrabold: 800;
    --ff-black: 900;

    --fs-body: 1rem;
    --fs-h1: 3rem;
    --fs-h2: 1.5 rem;
    --fs-h3: 1.2rem;
        
}

body {
    font-family: var(--ff-primary);
    font-size: var(--fs-body);
    line-height: 1.5;
    margin: 0;
}

/* Typography */

h1,
h2,
h3 {
    margin: 0;
}

h1 { font-size: var(--fs-h1) }
h2 { font-size: var(--fs-h2) }
h3 { font-size: var(--fs-h3) }

`

