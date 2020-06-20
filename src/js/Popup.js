/* Opens and closes popup
 */
export default class Popup {

    /*
     *Toggles Add and Edit popup

     *@param {HTMLElement} popupContainer - container to toggle
     */
    constructor(popupContainer) {
        this.popupContainer = popupContainer;
    }

    /*
     * opens popup
     *
     * @param {}
     */
    open() {
        this.popupContainer.classList.add('popup_is-opened');
    }

    close() {
        this.popupContainer.classList.remove('popup_is-opened');
    }
}
/*
 *
 *
 */

