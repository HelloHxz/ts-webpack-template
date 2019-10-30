import Box, { BoxProperty } from './box';
import './index.less';

export interface VBoxLayoutProperty {
  children: VBoxProperty[];
  className?: string;
}

export interface VBoxProperty  extends BaseBoxProperty{
  height: number | string;
}

export interface HBoxLayoutProperty {
  children: HBoxProperty[];
  className?: string;
}

export interface HBoxProperty extends BaseBoxProperty {
  width: number | string;
}

interface BaseBoxProperty {
  className?: string;
  action?: 'pop' | 'slide';
  actionState?: 'show' | 'hide';
  render: ({ wrapper }) => JQuery<HTMLElement> | null | void;
}

export interface BoxLayoutProperty {
  direction: 'vertical' | 'horizontal';
  className?: string;
  children: VBoxProperty[] | HBoxProperty[];
}


export { Box, BoxProperty };

class BoxLayout {
  props: BoxLayoutProperty;
  root: JQuery<HTMLElement>;
  inner: JQuery<HTMLElement>;
  children: Box[] = [];
  constructor(props: BoxLayoutProperty) {
    this.props = props;
    const className = [`xz-${props.direction==='horizontal'?'h':'v'}-box-layout`];
    this.root = $(`<div class='${className.join(' ')}'/>`);
    this.inner = $(`<div class='xz-${props.direction==='horizontal'?'h':'v'}-box-layout-inner'/>`);
    this.root.append(this.inner);
    this.initLayout();
  }

  private processChildren = (children: VBoxProperty[] | HBoxProperty[]): BoxProperty[] => {
    const { direction } = this.props;
    if(children.length > 3) {
      console.warn(`${direction === 'horizontal'? 'HBoxLayout':'VBoxLayout'}组件children参数只接受1~3长度的数组,而实际接受了${children.length}个`);
    }
    let re:BoxProperty[] = [];
    if(direction === 'horizontal') {
      re = this.processHBoxChildren(children as HBoxProperty[]);
    } else {
      re = this.processVBoxChildren(children as VBoxProperty[]);
    }
    return re;
  }
  private processHBoxChildren = (children: HBoxProperty[]): BoxProperty[] => {
    let re:BoxProperty[] = [];
    for(let i = 0, j = children.length; i < j; i += 1) {
      const item:HBoxProperty = children[i];
      let size: number | 'auto';
      if(i === 0 || i === 2) {
        if(!item.width || isNaN(item.width as number)) {
          console.error('HBoxLayout children属性的width属性指定错误，第一个和第三个width属性只能为数字');
          re = [];
          break;
        }
        size = parseFloat(item.width as string);
      } else {
        size = 'auto';
      }
      re.push({
        size,
        index: i,
        direction: 'horizontal',
        className: item.className,
        render: item.render,
      });
    }
    return re;
  }
  private processVBoxChildren = (children: VBoxProperty[]): BoxProperty[] => {
    let re:BoxProperty[] = [];
    for(let i = 0, j = children.length; i < j; i += 1) {
      const item:VBoxProperty = children[i];
      let size: number | 'auto';
      if(i === 0 || i === 2) {
        if(!item.height || isNaN(item.height as number)) {
          console.error('VBoxLayout children属性的height属性指定错误，第一个和第三个height属性只能为数字');
          re = [];
          break;
        }
        size = parseFloat(item.height as string);
      } else {
        size = 'auto';
      }
      re.push({
        size,
        index: i,
        className: item.className,
        direction: 'vertical',
        render: item.render,
      });
    }
    return re;
  }

  private initLayout = (): void => {
    const { direction } = this.props;
    this.root.css({ visibility: 'hidden' });
    const childrenConfig = this.processChildren(this.props.children);
    for(let i = 0, j = childrenConfig.length; i < j ; i += 1) {
      const config = childrenConfig[i];
      const box:Box = new Box(config);
      const styles:any = {};
      if(i===0) {
        if(direction === 'vertical') {
          styles.height = config.size as string;
      } else {
          styles.width = config.size as string;
        }
      } else if(i === 2) {
        if(direction === 'vertical') {
          styles.height = config.size as string;
          styles.bottom = '0';
        } else {
          styles.width = config.size as string;
          styles.right = '0';
        }
      }else {
        if(direction === 'vertical') {
          styles.top = childrenConfig[0].size  as string;
          styles.bottom = childrenConfig[2]? childrenConfig[2].size  as string : '0';
        } else {
          styles.left = childrenConfig[0].size  as string;
          styles.right =    childrenConfig[2]? childrenConfig[2].size  as string : '0';
        }
      }
      box.setStyle(styles);

      this.children.push(box);
      this.inner.append(box.render());
      this.setInitActionState();
      this.root.css({ visibility: 'visible' });
    }
  };

  private setInitActionState = ():void => {

  }

  render = ():JQuery<HTMLElement> => {
    return this.root;
  }
}

export default BoxLayout;
