/**
 * Smooth scroll utility function for navigating to sections
 * Handles cases where elements might not be immediately available
 */
export const smoothScrollTo = (targetId: string, headerOffset: number = 80): void => {
  // Add a small delay to ensure all components are rendered
  setTimeout(() => {
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const elementRect = targetElement.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const targetPosition = absoluteElementTop - headerOffset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    } else {
      console.warn(`Element with ID "${targetId}" not found`);
      
      // Special fallback for portfolio-contact
      if (targetId === 'portfolio-contact') {
        const portfolioSection = document.getElementById('portfolio');
        if (portfolioSection) {
          const portfolioRect = portfolioSection.getBoundingClientRect();
          const portfolioTop = portfolioRect.top + window.pageYOffset;
          // Scroll to near the end of portfolio section where contact is
          window.scrollTo({
            top: portfolioTop + portfolioSection.offsetHeight - 600,
            behavior: 'smooth'
          });
        }
      }
    }
  }, 100);
};

/**
 * Handle smooth scroll for navigation links
 */
export const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string): void => {
  e.preventDefault();
  const targetId = href.replace('#', '');
  smoothScrollTo(targetId);
};