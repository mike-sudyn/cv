export const GALLERY_PLAY = 'GALLERY_PLAY';
export const GALLERY_STOP = 'GALLERY_STOP';
export const GALLERY_NEXT = 'GALLERY_NEXT';
export const GALLERY_PREV = 'GALLERY_PREV';


export function galleryPlay() {
    return {
        type: GALLERY_PLAY
    };
}

export function galleryStop() {
    return {
        type: GALLERY_STOP
    };
}

export function galleryNext() {
    return {
        type: GALLERY_NEXT
    };
}

export function galleryPrev() {
    return {
        type: GALLERY_PREV
    };
}
