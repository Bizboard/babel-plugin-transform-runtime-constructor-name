/**
 * Adds a class property '_name' to Arva Controller and Model classes containing their unmangled class names.
 *
 * @param t
 * @returns {{visitor: {Class: (function(*=))}}}
 */
export default function({ types: t }) {
    return {
        visitor: {
            Class(path) {
                let superClassName = path.node.superClass.name;
                if(superClassName.includes('Controller') || superClassName.includes('Model') || superClassName.includes('PrioritisedArray')) {
                    let name = path.node.id.name;
                    let nameMethod = t.classMethod('get', t.Identifier('_name'), [], t.blockStatement([
                        t.returnStatement(t.stringLiteral(name))
                    ]), false, true);
                    path.node.body.body.push(nameMethod);
                    path.replaceWith(path);
                }
            }
        }
    };
}
