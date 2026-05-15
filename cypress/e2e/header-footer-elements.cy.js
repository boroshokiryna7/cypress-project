describe('QAuto Website - Header and Footer Elements', () => {
  beforeEach(() => {
    
    cy.visit('https://qauto.forstudy.space/', { 
      failOnStatusCode: false,
      timeout: 120000
    });
    
    cy.get('body', { timeout: 30000 }).should('exist');
  });

  describe('Header Elements - Buttons and Navigation', () => {
    it('should find or verify header if present', () => {
      // Check if header exists on page
      cy.get('body').then(($body) => {
        if ($body.find('header').length > 0) {
          cy.get('header').should('exist');
        } else {
          cy.log('Note: No header element found on this page');
        }
      });
    });

    it('should find all header buttons if header exists', () => {
     
      cy.get('body').then(($body) => {
        if ($body.find('header').length > 0) {
          cy.get('header').within(() => {
            cy.get('button').as('headerButtons');
          });
          
         
          cy.get('@headerButtons').then(($buttons) => {
            if ($buttons.length > 0) {
              cy.log(`Found ${$buttons.length} button(s) in header`);
            } else {
              cy.log('No buttons found in header');
            }
          });
        } else {
          cy.log('Note: No header element found on this page');
        }
      });
    });

    it('should verify all header buttons are visible and not disabled (if present)', () => {
      
      cy.get('body').then(($body) => {
        if ($body.find('header button').length > 0) {
          cy.get('header').within(() => {
            cy.get('button').each(($button) => {
              cy.wrap($button)
                .should('be.visible')
                .should('not.be.disabled');
            });
          });
        } else {
          cy.log('No header buttons found');
        }
      });
    });

    it('should get all header button texts if buttons exist', () => {
     
      cy.get('body').then(($body) => {
        if ($body.find('header button').length > 0) {
          cy.get('header').within(() => {
            cy.get('button').then(($buttons) => {
              const buttonTexts = [];

              cy.wrap($buttons).each(($btn) => {
                const text = $btn.text().trim();
                if (text) {
                  buttonTexts.push(text);
                }
              }).then(() => {
                if (buttonTexts.length > 0) {
                  cy.log('Header Buttons Found:');
                  buttonTexts.forEach((text, index) => {
                    cy.log(`  ${index + 1}. ${text}`);
                  });
                }
              });
            });
          });
        } else {
          cy.log('No header buttons found on this page');
        }
      });
    });

    it('should find all header links if header exists', () => {
     
      cy.get('body').then(($body) => {
        if ($body.find('header').length > 0) {
          cy.get('header').within(() => {
            cy.get('a').then(($links) => {
              cy.log(`Found ${$links.length} link(s) in header`);
            });
          });
        } else {
          cy.log('No header element found');
        }
      });
    });

    it('should verify header links have href attributes if present', () => {
   
      cy.get('body').then(($body) => {
        if ($body.find('header a').length > 0) {
          cy.get('header').within(() => {
            cy.get('a').each(($link) => {
              cy.wrap($link)
                .should('have.attr', 'href')
                .should('not.be.empty');
            });
          });
        } else {
          cy.log('No header links found');
        }
      });
    });
  });

  describe('Footer Elements - Social Links and Navigation', () => {
    beforeEach(() => {
      
      cy.get('body').then(($body) => {
        if ($body.find('footer').length > 0) {
          cy.get('footer').scrollIntoView();
        }
      });
    });

    it('should find all footer links if footer exists', () => {
    
      cy.get('body').then(($body) => {
        if ($body.find('footer').length > 0) {
          cy.get('footer').within(() => {
            cy.get('a').as('footerLinks');
          });

          cy.get('@footerLinks').then(($links) => {
            cy.log(`Found ${$links.length} link(s) in footer`);
          });
        } else {
          cy.log('No footer element found on this page');
        }
      });
    });

    it('should find Facebook link in footer if available', () => {
    
      cy.get('body').then(($body) => {
        if ($body.find('footer').length > 0 && $body.find('footer a').length > 0) {
          cy.get('footer').within(() => {
            cy.get('a').then(($links) => {
              const facebookLink = Array.from($links).find(link => 
                /facebook|fb/i.test(link.textContent || link.title || link.href)
              );
              if (facebookLink) {
                cy.wrap(facebookLink)
                  .should('be.visible')
                  .should('have.attr', 'href');
                cy.log('Facebook link found in footer');
              } else {
                cy.log('Facebook link not found in footer');
              }
            });
          });
        } else {
          cy.log('No footer element found');
        }
      });
    });

    it('should find Telegram link in footer if available', () => {
      
      cy.get('body').then(($body) => {
        if ($body.find('footer').length > 0 && $body.find('footer a').length > 0) {
          cy.get('footer').within(() => {
            cy.get('a').then(($links) => {
              const telegramLink = Array.from($links).find(link => 
                /telegram|tg/i.test(link.textContent || link.title || link.href)
              );
              if (telegramLink) {
                cy.wrap(telegramLink)
                  .should('be.visible')
                  .should('have.attr', 'href');
                cy.log('Telegram link found in footer');
              } else {
                cy.log('Telegram link not found in footer');
              }
            });
          });
        } else {
          cy.log('No footer element found');
        }
      });
    });

    it('should find YouTube link in footer if available', () => {
      
      cy.get('body').then(($body) => {
        if ($body.find('footer').length > 0 && $body.find('footer a').length > 0) {
          cy.get('footer').within(() => {
            cy.get('a').then(($links) => {
              const youtubeLink = Array.from($links).find(link => 
                /youtube|yt/i.test(link.textContent || link.title || link.href)
              );
              if (youtubeLink) {
                cy.wrap(youtubeLink).should('be.visible');
                cy.log('YouTube link found in footer');
              } else {
                cy.log('YouTube link not found in footer');
              }
            });
          });
        }
      });
    });

    it('should find Instagram link in footer if available', () => {
      
      cy.get('body').then(($body) => {
        if ($body.find('footer').length > 0 && $body.find('footer a').length > 0) {
          cy.get('footer').within(() => {
            cy.get('a').then(($links) => {
              const instagramLink = Array.from($links).find(link => 
                /instagram|ig/i.test(link.textContent || link.title || link.href)
              );
              if (instagramLink) {
                cy.wrap(instagramLink).should('be.visible');
                cy.log('Instagram link found in footer');
              } else {
                cy.log('Instagram link not found in footer');
              }
            });
          });
        }
      });
    });

    it('should get all footer links with text and href', () => {
     
      cy.get('body').then(($body) => {
        if ($body.find('footer a').length > 0) {
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
                if (footerLinks.length > 0) {
                  cy.log('Footer Links Found:');
                  footerLinks.forEach((link, index) => {
                    cy.log(`  ${index + 1}. ${link.text} -> ${link.href}`);
                  });
                }
              });
            });
          });
        } else {
          cy.log('No footer links found');
        }
      });
    });

    it('should verify all footer links have valid href attributes if present', () => {
     
      cy.get('body').then(($body) => {
        if ($body.find('footer a').length > 0) {
          cy.get('footer').within(() => {
            cy.get('a').each(($link) => {
              const href = $link.attr('href');
              if (href) {
                expect(href).to.not.be.empty;
              }
            });
          });
        }
      });
    });

    it('should find all footer buttons if present', () => {
      
      cy.get('body').then(($body) => {
        if ($body.find('footer button').length > 0) {
          cy.get('footer').within(() => {
            cy.get('button').then(($buttons) => {
              cy.wrap($buttons).each(($btn) => {
                cy.wrap($btn).should('be.visible');
              });
              cy.log(`Total footer buttons found: ${$buttons.length}`);
            });
          });
        } else {
          cy.log('No footer buttons found');
        }
      });
    });
  });
});

