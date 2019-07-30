define(["./DEELoadStatus", "../Core/Color"], function (e, t) {
    "use strict";

    function i() {
        this.id = -1, this.status = e.UNLOAD, this.imgUrl = "", this.bImgBlobUrl = !1, this.transparent = !1, this.imgBlob = void 0, this.width = 0, this.height = 0, this.pixelFormat = 0, this.color = new t, this.ambient = new t, this.specular = new t, this.shininess = 30, this.emissive = new t, this.emissiveIntensity = 1, this.texture = void 0, this.color = new t(1, 1, 0, 1)
    }

    return i
});