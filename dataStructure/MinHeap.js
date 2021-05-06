import Heap from './Heap.js';

export default class MinHeap extends Heap {
  /**
   * 
   * Checa si el par es correcto, con nosotros en minheap
   * es bueno recordar que el item root siempre es el menor.
   *
   * @param {*} firstElement
   * @param {*} secondElement
   * @return {boolean}
   */
  pairIsInCorrectOrder(firstElement, secondElement) {
    return this.compare.lessThanOrEqual(firstElement, secondElement);
  }
}
