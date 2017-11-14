import {Component, EventEmitter, Input, Output, OnChanges} from '@angular/core';

@Component({
  selector: 'aot-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.less']
})
export class TreeComponent implements OnChanges {

  @Input() children: ItreeNode[];
  @Input() selectedNode: ItreeNode;
  @Input() showProperties: boolean;
  @Output() onSelected = new EventEmitter<ItreeNode>();
  @Output() onProperties = new EventEmitter<ItreeNode>();

  constructor()
  {

  }
  ngOnChanges() {

  }


  openProps(node: ItreeNode) {
    this.onProperties.emit(node);
  }
  childOpenProps(node: ItreeNode) {
    this.openProps(node);
  }

  shownode( node: ItreeNode) {
    node.hide = !node.hide;


  }
  select(node: ItreeNode ) {
    if (node === this.selectedNode) {
      this.selectedNode = null;
      this.onSelected.emit(null);
    }else {
      this.selectedNode = node;
      this.onSelected.emit(node);
    }


  }

  childSelected(node: ItreeNode ) {
    this.selectedNode = node;
    this.onSelected.emit(node);
  }


}

export interface ItreeNode {
  text: string;
  children: any[];
  hide: boolean;
}


