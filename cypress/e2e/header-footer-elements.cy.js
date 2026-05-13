describe('QAuto Website - Header and Footer Elements', () => {
  beforeEach(() => {
    // Login using custom command
    cy.loginToQAuto('guest', 'welcome2qauto');
  });

  describe('Header Elements - Buttons and Navigation', () => {
    it('should find all header buttons and verify they exist', () => {
      // Finding all buttons in header
      cy.get('header').within(() => {
        cy.get('button').as('headerButtons');
      });

      // Verify buttons exist and are visible
      cy.get('@headerButtons').should('exist');
      cy.get('@headerButtons').should('have.length.greaterThan', 0);
    });

    it('should verify all header buttons are visible and not disabled', () => {
      // Check each button is visible and enabled
      cy.get('header').within(() => {
        cy.get('button').each(($button) => {
          cy.wrap($button)
            .should('be.visible')
            .should('not.be.disabled');
        });
      });
    });

    it('should get all header button texts', () => {
      // Extract and log all button texts
      cy.get('header').within(() => {
        cy.get('button').then(($buttons) => {
          const buttonTexts = [];

          cy.wrap($buttons).each(($btn) => {
            const text = $btn.text().trim();
            if (text) {
              buttonTexts.push(text);
            }
          }).then(() => {
            cy.log('Header Buttons Found:');
            buttonTexts.forEach((text, index) => {
              cy.log(`  ${index + 1}. ${text}`);
            });
            expect(buttonTexts.length).to.be.greaterThan(0);
          });
        });
      });
    });

    it('should find all header links', () => {
      // Find all links in header
      cy.get('header').within(() => {
        cy.get('a').should('exist');
      });
    });

    it('should verify header links have href attributes', () => {
      // Verify all links have valid href
      cy.get('header').within(() => {
        cy.get('a').each(($link) => {
          cy.wrap($link)
            .should('have.attr', 'href')
            .should('not.be.empty');
        });
      });
    });
  });

  describe('Footer Elements - Social Links and Navigation', () => {
    beforeEach(() => {
      // Scroll to footer before each footer test
      cy.get('footer').scrollIntoView();
    });

    it('should find all footer links', () => {
      // Find all links in footer
      cy.get('footer').within(() => {
        cy.get('a').as('footerLinks');
      });

      cy.get('@footerLinks').should('exist');
      cy.get('@footerLinks').should('have.length.greaterThan', 0);
    });

    it('should find Facebook link in footer', () => {
      // Search for Facebook link
      cy.get('footer').within(() => {
        cy.contains('a', /facebook|fb/i)
          .should('exist')
          .should('be.visible')
          .should('have.attr', 'href');
      });
    });

    it('should find Telegram link in footer', () => {
      // Search for Telegram link
      cy.get('footer').within(() => {
        cy.contains('a', /telegram|tg/i)
          .should('exist')
          .should('be.visible')
          .should('have.attr', 'href');
      });
    });

    it('should find YouTube link in footer', () => {
      // Search for YouTube link
      cy.get('footer').within(() => {
        cy.contains('a', /youtube|yt/i)
          .should('exist')
          .should('be.visible')
          .should('have.attr', 'href');
      });
    });

    it('should find Instagram link in footer', () => {
      // Search for Instagram link
      cy.get('footer').within(() => {
        cy.contains('a', /instagram|ig/i)
          .should('exist')
          .should('be.visible')
          .should('have.attr', 'href');
      });
    });

    it('should find LinkedIn link in footer', () => {
      // Search for LinkedIn link
      cy.get('footer').within(() => {
        cy.contains('a', /linkedin|in/i)
          .should('exist')
          .should('be.visible')
          .should('have.attr', 'href');
      });
    });

    it('should find ithillel.ua link in footer', () => {
      // Search for ithillel.ua link
      cy.get('footer').within(() => {
        cy.contains('a', /ithillel/i)
          .should('exist')
          .should('be.visible')
          .should('have.attr', 'href');
      });
    });

    it('should find support email link in footer', () => {
      // Search for support email link
      cy.get('footer').within(() => {
        cy.contains('a', /support@|support/i)
          .should('exist')
          .should('be.visible')
          .should('have.attr', 'href');
      });
    });

    it('should get all footer links with text and href', () => {
      // Extract all footer links information
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
            cy.log('Footer Links Found:');
            footerLinks.forEach((link, index) => {
              cy.log(`  ${index + 1}. ${link.text} -> ${link.href}`);
            });
            expect(footerLinks.length).to.be.greaterThan(0);
          });
        });
      });
    });

    it('should verify all footer links have valid href attributes', () => {
      // Verify href attributes
      cy.get('footer').within(() => {
        cy.get('a').each(($link) => {
          const href = $link.attr('href');
          expect(href).to.exist;
          expect(href).to.not.be.empty;
        });
      });
    });

    it('should find all footer buttons if present', () => {
      // Find footer buttons
      cy.get('footer').within(() => {
        cy.get('button').then(($buttons) => {
          if ($buttons.length > 0) {
            cy.wrap($buttons).each(($btn) => {
              cy.wrap($btn).should('be.visible');
            });
            cy.log(`Total footer buttons found: ${$buttons.length}`);
          } else {
            cy.log('No buttons found in footer');
          }
        });
      });
    });

    it('should verify footer structure and content', () => {
      // Verify footer structure
      cy.get('footer')
        .should('exist')
        .should('be.visible');

      cy.get('footer').within(() => {
        // Check for links or buttons
        cy.get('a, button').should('have.length.greaterThan', 0);
      });
    });
  });

  describe('Header and Footer Combined - Best Practices Verification', () => {
    it('should demonstrate best practices: using aliases and within', () => {
      // Best practice: Using aliases for element references
      cy.get('header').as('header');
      cy.get('footer').as('footer');

      // Verify header exists
      cy.get('@header').should('exist').should('be.visible');

      // Scroll and verify footer
      cy.get('@footer').scrollIntoView().should('exist');
    });

    it('should demonstrate best practices: using data attributes if available', () => {
      // Check if data-cy attributes exist
      cy.get('[data-cy]').then(($elem) => {
        if ($elem.length > 0) {
          cy.log('Elements with data-cy attributes found');
          cy.wrap($elem).each(($el) => {
            cy.wrap($el).should('exist');
          });
        } else {
          cy.log('No data-cy attributes found - using semantic selectors instead');
        }
      });
    });

    it('should verify all interactive elements are properly labeled', () => {
      // Check buttons and links for accessibility
      cy.get('header, footer').within(() => {
        cy.get('button, a').each(($elem) => {
          // Check for text content or aria-label
          const hasText = $elem.text().trim().length > 0;
          const hasAriaLabel = $elem.attr('aria-label');

          expect(hasText || hasAriaLabel).to.be.true;
        });
      });
    });

    it('should count total interactive elements', () => {
      // Count all buttons and links in header and footer
      let totalElements = 0;

      cy.get('header').within(() => {
        cy.get('button, a').then(($elem) => {
          totalElements += $elem.length;
        });
      });

      cy.get('footer').then(() => {
        cy.get('footer').within(() => {
          cy.get('button, a').then(($elem) => {
            totalElements += $elem.length;
            cy.log(`Total interactive elements in header and footer: ${totalElements}`);
            expect(totalElements).to.be.greaterThan(0);
          });
        });
      });
    });
  });
});

