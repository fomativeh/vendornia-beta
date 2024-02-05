export function scrollToSection(sectionId:string, offset:number) {
    const section = document.getElementById(sectionId);
    if (section) {
        const sectionTop = section.getBoundingClientRect().top;
        window.scrollBy({
            top: sectionTop - offset,
            behavior: "smooth"
        });
    }
}