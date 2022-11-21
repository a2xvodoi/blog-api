import fs from "fs";

export function isBase64(str) {
    str = str.replace(/^data(.+)(base64,)/, "");
    if (str === "" || str.trim() === "") {
      return false;
    }
    try {
      return btoa(atob(str)) == str;
    } catch (err) {
      return false;
    }
  }

export function extFileFromBase64(base64) {
    return base64.split(";")[0].split("/")[1];
}

export function base64Decode(base64, file) {
    if (!file) {
        file = Date.now() + "_" + Math.floor(Math.random() * 1000);
    }
    const ext = extFileFromBase64(base64);
    const buffer = Buffer.from(
        base64.replace(/^data(.+)(base64,)/, ""),
        "base64"
    );
    fs.writeFileSync("public/images/" + file + "." + ext, buffer);
    return "/images/" + file + "." + ext;
}

export function unlink(filePath, root = "public") {
    try {
        fs.unlinkSync(root + filePath);
    } catch (error) {
        console.log(error);
    }
}

export function objectClean(obj) {
    for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
          delete obj[propName];
        }
      }
      return obj
}
