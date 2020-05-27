export default class CardList {
    /**
     *Creates keys listContainer, cardArray.
     *
     *@param {HTMLElement} listContainer - a place to store
     *@param {array[Card]} cardArray - array pf card
     */
    constructor(listContainer, cardArray) {
        this.listContainer = listContainer;
        this.cardArray = cardArray;
    }

    /*
     *Adds a card to the cardArray
     *
     *@param {Card} newCard  - a ready card to add
     *@return {array} - updated array of cards
     */


    /*REVIEW. Надо лучше. Лучше, чтобы класс CardList не знал, что у класса Card есть метод create, 
    это бы сделало эти классы более
    независимыми друг от друга, то есть целесообразно подумать о передаче в методы CardList 
    не самого экземпляра 
    Card для каждой карточки,
    а также для каждой карточки  результата работы метода create класса Card.
    То есть в index.js аргумент, передаваемый в методы класса CardList представить примерно в таком виде:
    card = () => {
        const card = new Card(параметры);
        return card.create();
    }

    При этом подумать, можно ли заносить в this.cardArray (кстати обновляемый this.cardArray нигде в проекте "Место" не используется)
    также не весь экземпляр, а, например, объект с атрибутами карточки.
    */
    addNewCard(newCard) {
        this.cardArray.push(newCard);
        const htmlNewCard = newCard.create();
        this.listContainer.append(htmlNewCard);
    }

    /**
     *Displays cards in list container
     *
     *@return {Void}
     */
    render() {
        const htmlCardArray = this.cardArray.map(card => card.create());
        for (let htmlCard of htmlCardArray) {
            this.listContainer.append(htmlCard);
        }
    }
}