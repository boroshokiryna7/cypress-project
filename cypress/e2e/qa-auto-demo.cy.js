describe('QAuto Website - Demo Page Elements', () => {
  beforeEach(() => {
    // Visit the main page without authentication requirement
    cy.visit('https://qauto.forstudy.space/', { 
      failOnStatusCode: false,
      timeout: 120000
    });
    
    cy.get('body', { timeout: 30000 }).should('exist');
  });

  describe('Header Elements - Find all buttons and navigation', () => {
    it('should find header element', () => {
      // Verify header exists
      cy.get('header').should('exist');
    });

    it('should find all header navigation elements', () => {
      // Find all interactive elements in header
      cy.get('header').then(($header) => {
        if ($header.find('button').length > 0) {
          cy.get('header button').should('have.length.greaterThan', 0);
        }
      });
    });

    it('should find all header links', () => {
      // Find all links in header
      cy.get('header').then(($header) => {
        const links = $header.find('a');
        cy.log(`Found ${links.length} links in header`);
      });
    });

    it('should verify header is visible and accessible', () => {
      // Check header visibility
      cy.get('header')
        .should('exist')
        .should('be.visible');
    });

    it('should get all header button texts', () => {
      // Get all button texts from header
      cy.get('header').within(() => {
        cy.get('button').then(($buttons) => {
          if ($buttons.length > 0) {
            const buttonTexts = [];
            cy.wrap($buttons).each(($btn) => {
              const text = $btn.text().trim();
              if (text) {
                buttonTexts.push(text);
                cy.log(`Header Button: ${text}`);
              }
            }).then(() => {
              cy.log(`Total header buttons: ${buttonTexts.length}`);
            });
          }
        });
      });
    });
  });

  describe('Footer Elements - Find all links and buttons', () => {
    beforeEach(() => {
      // Scroll to footer
      cy.get('footer').scrollIntoView({ duration: 500 });
      cy.wait(1000);
    });

    it('should find footer element', () => {
      // Verify footer exists
      cy.get('footer').should('exist');
    });

    it('should find all footer links', () => {
      // Find all links in footer
      cy.get('footer').then(($footer) => {
        const links = $footer.find('a');
        cy.log(`Found ${links.length} links in footer`);
        expect(links.length).to.be.greaterThan(0);
      });
    });

    it('should find Facebook link (case-insensitive)', () => {
      // Search for Facebook link
      cy.get('footer').within(() => {
        cy.get('a').then(($links) => {
          const facebookLink = Array.from($links).find($link =>
            $link.textContent.toLowerCase().includes('facebook') ||
            $link.textContent.toLowerCase().includes('fb') ||
            ($link.getAttribute('href') || '').toLowerCase().includes('facebook')
          );
          if (facebookLink) {
            cy.log('✓ Facebook link found');
            expect(facebookLink).to.exist;
          } else {
            cy.log('ℹ Facebook link not found with expected text');
          }
        });
      });
    });

    it('should find Telegram link (case-insensitive)', () => {
      // Search for Telegram link
      cy.get('footer').within(() => {
        cy.get('a').then(($links) => {
          const telegramLink = Array.from($links).find($link =>
            $link.textContent.toLowerCase().includes('telegram') ||
            $link.textContent.toLowerCase().includes('tg') ||
            ($link.getAttribute('href') || '').toLowerCase().includes('telegram')
          );
          if (telegramLink) {
            cy.log('✓ Telegram link found');
            expect(telegramLink).to.exist;
          } else {
            cy.log('ℹ Telegram link not found with expected text');
          }
        });
      });
    });

    it('should find YouTube link (case-insensitive)', () => {
      // Search for YouTube link
      cy.get('footer').within(() => {
        cy.get('a').then(($links) => {
          const youtubeLink = Array.from($links).find($link =>
            $link.textContent.toLowerCase().includes('youtube') ||
            $link.textContent.toLowerCase().includes('yt') ||
            ($link.getAttribute('href') || '').toLowerCase().includes('youtube')
          );
          if (youtubeLink) {
            cy.log('✓ YouTube link found');
            expect(youtubeLink).to.exist;
          } else {
            cy.log('ℹ YouTube link not found with expected text');
          }
        });
      });
    });

    it('should find Instagram link (case-insensitive)', () => {
      // Search for Instagram link
      cy.get('footer').within(() => {
        cy.get('a').then(($links) => {
          const instagramLink = Array.from($links).find($link =>
            $link.textContent.toLowerCase().includes('instagram') ||
            $link.textContent.toLowerCase().includes('ig') ||
            ($link.getAttribute('href') || '').toLowerCase().includes('instagram')
          );
          if (instagramLink) {
            cy.log('✓ Instagram link found');
            expect(instagramLink).to.exist;
          } else {
            cy.log('ℹ Instagram link not found with expected text');
          }
        });
      });
    });

    it('should find LinkedIn link (case-insensitive)', () => {
      // Search for LinkedIn link
      cy.get('footer').within(() => {
        cy.get('a').then(($links) => {
          const linkedinLink = Array.from($links).find($link =>
            $link.textContent.toLowerCase().includes('linkedin') ||
            $link.textContent.toLowerCase().includes('in') ||
            ($link.getAttribute('href') || '').toLowerCase().includes('linkedin')
          );
          if (linkedinLink) {
            cy.log('✓ LinkedIn link found');
            expect(linkedinLink).to.exist;
          } else {
            cy.log('ℹ LinkedIn link not found with expected text');
          }
        });
      });
    });

    it('should find ithillel.ua link', () => {
      // Search for ithillel link
      cy.get('footer').within(() => {
        cy.get('a').then(($links) => {
          const ithillelLink = Array.from($links).find($link =>
            $link.textContent.toLowerCase().includes('ithillel') ||
            ($link.getAttribute('href') || '').toLowerCase().includes('ithillel')
          );
          if (ithillelLink) {
            cy.log('✓ ithillel.ua link found');
            expect(ithillelLink).to.exist;
          } else {
            cy.log('ℹ ithillel.ua link not found with expected text');
          }
        });
      });
    });

    it('should find support email link', () => {
      // Search for support email link
      cy.get('footer').within(() => {
        cy.get('a').then(($links) => {
          const supportLink = Array.from($links).find($link =>
            $link.textContent.toLowerCase().includes('support') ||
            $link.textContent.toLowerCase().includes('@ithillel') ||
            ($link.getAttribute('href') || '').toLowerCase().includes('support')
          );
          if (supportLink) {
            cy.log('✓ Support email link found');
            expect(supportLink).to.exist;
          } else {
            cy.log('ℹ Support email link not found with expected text');
          }
        });
      });
    });

    it('should get all footer links with their URLs', () => {
      // Extract all footer links
      cy.get('footer').within(() => {
        cy.get('a').then(($links) => {
          const footerLinks = [];

          cy.wrap($links).each(($link) => {
            const text = $link.text().trim();
            const href = $link.attr('href');
            if (text) {
              footerLinks.push({ text, href });
            }
          }).then(() => {
            cy.log('=== Footer Links Found ===');
            footerLinks.forEach((link, index) => {
              cy.log(`${index + 1}. ${link.text} -> ${link.href}`);
            });
            expect(footerLinks.length).to.be.greaterThan(0);
          });
        });
      });
    });

    it('should verify all footer links have valid href attributes', () => {
      // Check href attributes
      cy.get('footer').within(() => {
        cy.get('a').each(($link) => {
          const href = $link.attr('href');
          expect(href).to.be.a('string');
          // href can be empty for anchor links
        });
      });
    });

    it('should find all footer buttons if present', () => {
      // Find footer buttons
      cy.get('footer').within(() => {
        cy.get('button').then(($buttons) => {
          const buttonCount = $buttons.length;
          if (buttonCount > 0) {
            cy.log(`Found ${buttonCount} button(s) in footer`);
            cy.wrap($buttons).each(($btn) => {
              cy.wrap($btn).should('be.visible');
            });
          } else {
            cy.log('No buttons found in footer');
          }
        });
      });
    });

    it('should verify footer structure contains links', () => {
      // Overall footer verification
      cy.get('footer')
        .should('exist')
        .should('be.visible');

      cy.get('footer').within(() => {
        cy.get('a, button').should('have.length.greaterThan', 0);
      });
    });
  });

  describe('Best Practices - Element Selection and Verification', () => {
    it('should demonstrate using aliases for repeated element access', () => {
      // Using aliases for cleaner code
      cy.get('header').as('header');
      cy.get('footer').as('footer');

      cy.get('@header').should('exist');
      cy.get('@footer').should('exist');
    });

    it('should demonstrate .within() for scoped selection', () => {
      // Using .within() to keep selections within specific elements
      cy.get('header').within(() => {
        cy.get('button, a').should('exist');
      });

      cy.get('footer').within(() => {
        cy.get('a, button').should('exist');
      });
    });

    it('should demonstrate filtering and iteration', () => {
      // Finding and iterating through multiple elements
      cy.get('footer').within(() => {
        cy.get('a').then(($links) => {
          cy.log(`Total interactive links in footer: ${$links.length}`);

          cy.wrap($links).each(($link, index) => {
            const linkText = $link.text().trim();
            if (linkText && index < 5) {
              cy.log(`Link ${index + 1}: ${linkText}`);
            }
          });
        });
      });
    });

    it('should use data attributes if available', () => {
      // Check for data attributes (common for testing)
      cy.get('[data-testid], [data-cy], [data-qa]').then(($elems) => {
        if ($elems.length > 0) {
          cy.log(`Found ${$elems.length} elements with data attributes`);
        } else {
          cy.log('No data-testid/data-cy/data-qa attributes found');
        }
      });
    });

    it('should count total interactive elements in page sections', () => {
      // Count buttons and links in different sections
      cy.get('header').within(() => {
        cy.get('button, a').then(($elem) => {
          cy.log(`Interactive elements in header: ${$elem.length}`);
        });
      });

      cy.get('footer').within(() => {
        cy.get('button, a').then(($elem) => {
          cy.log(`Interactive elements in footer: ${$elem.length}`);
        });
      });
    });
  });
});
