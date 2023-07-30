type Arg = string | { [key: string]: boolean } | null | undefined;
type ArgArray = Arg | Array<Arg>;

function classnames(...args: ArgArray[]): string {
  const classes: string[] = [];
  args.forEach((arg) => {
    if (Array.isArray(arg)) {
      //recursively call classname function to handle array type arg
      classes.push(...classnames(...arg).split(" "));
    } else if (typeof arg === "string") {
      classes.push(arg);
    } else if (typeof arg === "object" && arg !== null) {
      for (const key in arg) {
        if (arg.hasOwnProperty(key)) {
          //remove if latest key is false.
          if (!arg[key] && classes.includes(key)) {
            const index = classes.indexOf(key);
            if (index !== -1) {
              classes.splice(index, 1);
            }
          }

          //do not add if you  have already added the class name.
          else if (arg[key] && !classes.includes(key)) {
            classes.push(key);
          }
        }
      }
    }
  });
  return classes.join(" ");
}

const class1: string = "btn";
const class2: string = "btn-primary";
const class3: null = null;
const class4: string = "btn-lg";
const class5: { [key: string]: boolean } = {
  "btn-disabled": false,
  foo: true,
  "btn-active": true,
};
const class6: { [key: string]: boolean } = { "btn-inactive": true };
const class7: { [key: string]: boolean } = { foo: false };
const combinedClasses: string = classnames(
  class1,
  class2,
  class3,
  class4,
  [class5, class6],
  class7,
  undefined
);
console.log(combinedClasses);
