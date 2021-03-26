import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`

/* Global Styling */

*,
*::before,
*::after {
    box-sizing: border-box;
}



:root {   
    --bs-accent1: 2px 5px 10px rgb(52, 176, 95, .52);
    --bs-accent1-light: 2px 5px 10px rgb(52, 176, 95, .29);
    --bs-accent2: 2px 5px 10px rgb(252, 136, 139, .66);
    --bs-accent2-light: 2px 5px 10px rgb(252, 136, 139, .9);
    --bs-dark: 2px 5px 10px rgb(112, 112, 112, .5); 

    --clr-accent1: rgb(67, 206, 157, 1);
    --clr-accent1-light: rgb(238, 252, 245, 1);  
    --clr-accent2: rgb(252, 136, 139, 1);
    --clr-accent2-light: rgb(254, 216, 217, 1);
    --clr-dark: rgb(112, 112, 112, 1);
    --clr-light: rgb(255, 255, 255);

    --ff-primary: 'Nunito Sans', sans-serif;

    --fs-body: 1rem;
    --fs-h1: 2rem;
    --fs-h2: 1.4rem;
    --fs-h3: 1.1rem;

    --fw-extralight: 200;
    --fw-light: 300;
    --fw-regular: 400;
    --fw-semibold: 600;
    --fw-bold: 700;
    --fw-extrabold: 800;
    --fw-black: 900;        
}

body {    
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

.App {
    align-items: center;
    background: linear-gradient(var(--clr-light), rgb(252, 250, 248));
    color: var(--clr-dark);
    display: flex;
    flex-direction: column;
    font-family: var(--ff-primary);
    font-size: var(--fs-body);
    height: 100vh;
    line-height: 1.5;
    text-align: center;
}
`

