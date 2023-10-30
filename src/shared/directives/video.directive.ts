import {
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    Output
} from '@angular/core';

@Directive({
  selector: 'video',
})
export class HTMLVideoDirective {
  public element: HTMLVideoElement;

  constructor(elRef: ElementRef) {
    this.element = elRef.nativeElement;
  }
}


@Directive({
  selector: 'video[mediaStream]',
})
export class MediaStreamDirective
  extends HTMLVideoDirective
{
  /**
   * config is using [MediaStreamConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints)
   */
  @Input('mediaStream')
  public config!: MediaStreamConstraints;

  @Output()
  public intitError: EventEmitter<DOMException | ReferenceError> =
    new EventEmitter();

  @Output()
  public mediaStreamRef: EventEmitter<MediaStream> = new EventEmitter();

  private readonly document: Document = document;

  constructor(
    elRef: ElementRef
    ) {
    super(elRef);
  }


  /**
   * @param config mixing of [toDataURL()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL)
   * and [drawImage()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)
   */
  public getSnapshotUrl(config?: {
    width?: number;
    height?: number;
    type?: string;
    encoderOptions?: number;
  }): string {
    const canvas: HTMLCanvasElement = this.document.createElement('canvas');
    canvas.width = config?.width || this.element.offsetWidth;
    canvas.height = config?.height || this.element.offsetHeight;
    canvas
      .getContext('2d')
      ?.drawImage(this.element, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL(config?.type, config?.encoderOptions);
  }

  public getVideoTime() {
    return this.element.currentTime / 10;
  }

  public chooseVideoReaction(timeframe: number) {
    this.element.currentTime = Math.round(timeframe * 10);
    // console.log(this.element.currentTime)
    return this.element.pause();
  }
}