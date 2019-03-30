export default function compareVersion(oldVersion: string, newVersion: string, containEqual = true): boolean {
  if (typeof oldVersion !== "string" || typeof newVersion !== "string") {
    return false;
  }
  const oldArray = oldVersion.split(".");
  const newArray = newVersion.split(".");
  let o: any;
  let n: any;
  do {
    o = oldArray.shift();
    n = newArray.shift();
  } while (o === n && newArray.length > 0);
  if (containEqual) {
    return (n | 0) >= (o | 0);
  } else {
    return (n | 0) > (o | 0);
  }
}