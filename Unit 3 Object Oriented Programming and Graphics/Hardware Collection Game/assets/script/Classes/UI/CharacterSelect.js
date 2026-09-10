'use strict';

export class CharacterSelect {
    /**
     * A helper class for displaying the character selection screen at start of game
     * @param {Array} characters array of character config objects
     * @param {Function} onSelect callback fired with chosen character config
     */
    constructor(characters, onSelect) {
        this.characters = characters;
        this.onSelect = onSelect;
        this.overlay = null;
    }

    /** display the character selection overlay */
    show() {
        this.#injectStyles();

        // Overlay
        this.overlay = document.createElement('div');
        this.overlay.id = 'char-select-overlay';

        // Heading
        const heading = document.createElement('h2');
        heading.className   = 'cs-heading';
        heading.textContent = 'Choose Your Character';
        this.overlay.appendChild(heading);

        // Cards container
        const container = document.createElement('div');
        container.className = 'cs-container';

        this.characters.forEach(char => { container.appendChild(this.#buildCard(char)); });

        this.overlay.appendChild(container);
        document.body.appendChild(this.overlay);
    }

    /** hide the character selection overlay */
    hide() {
        // only remove the overlay when one is currently displayed
        if (this.overlay) {
            this.overlay.remove();
            this.overlay = null;
        }
    }

    // ++++++++++++++++++++++++++++ Private Helper Methods ++++++++++++++++++++++++++++
    /** Builds a single character card element */
    #buildCard(char) {
        const card = document.createElement('div');
        card.className = 'cs-card';

        // Sprite image
        const img = document.createElement('img');
        img.src             = char.spriteSrc;
        img.alt             = char.label;
        img.className       = 'cs-img';

        // Caption (title + description), show on hover via CSS
        const caption = document.createElement('div');
        caption.className   = 'cs-caption';

        const title = document.createElement('span');
        title.className     = 'cs-caption-title';
        title.textContent   = char.label;

        const desc = document.createElement('span');
        desc.className      = 'cs-caption-desc';
        desc.textContent    = char.description;

        caption.appendChild(title);
        caption.appendChild(desc);
        card.appendChild(img);
        card.appendChild(caption);

        card.addEventListener('click', () => {
            this.onSelect(char);
            this.hide();
        });

        return card;
    }

    /** Idempotent/repeatable method to injects CSS once into <head> */
    #injectStyles() {
        // Skip reinjecting the stylesheet if it was already added earlier.
        if (document.getElementById('char-select-styles')) return;

        const style = document.createElement('style');
        style.id    = 'char-select-styles';
        style.textContent = `
            #char-select-overlay {
                position: fixed;
                inset: 0;
                z-index: 100;
                background: rgba(50, 50, 50, 0.78);
                backdrop-filter: blur(2px);

                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 2.5rem;
            }

            .cs-heading {
                color: #fff;
                font-size: 2rem;
                letter-spacing: 0.12em;
                text-shadow: 0 2px 10px rgba(0,0,0,0.8);
                margin: 0;
            }

            .cs-container {
                display: flex;
                gap: 3.5rem;
            }

            .cs-card {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.75rem;

                padding: 1.25rem 1.5rem;
                border-radius: 14px;
                border: 3px solid transparent;
                background: rgba(0, 0, 0, 0.35);

                cursor: pointer;
                transition: border-color 0.15s ease, box-shadow 0.15s ease;
            }

            .cs-card:hover {
                border-color: #fff;
                box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.4);
            }

            .cs-img {
                width: 142px;
                height: 128px;
                object-fit: contain;
                image-rendering: pixelated;
            }

            .cs-caption {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.2rem;

                opacity: 0;
                transform: translateY(4px);
                transition: opacity 0.15s ease, transform 0.15s ease;
                pointer-events: none;
            }

            .cs-card:hover .cs-caption {
                opacity: 1;
                transform: translateY(0);
            }

            .cs-caption-title {
                color: #ffffff;
                font-size: 1.1rem;
                font-weight: bold;
                letter-spacing: 0.06em;
            }

            .cs-caption-desc {
                color: #cccccc;
                font-size: 0.82rem;
                text-align: center;
                max-width: 160px;
                line-height: 1.4;
            }
        `;

        document.head.appendChild(style);
    }
}
