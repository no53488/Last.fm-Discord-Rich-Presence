export const mode = 'jit';
export const purge = ['./*.html'];
export const plugins = [require('daisyui')];
export const daisyui = {
    themes: ['dracula']
};
export const content = [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
];
