// import { createSchema } from "sanity"
import comment from './comment'
import pin from './pin'
import postedBy from './postedBy'
import save from './save'
import user from './user'


export const schemaTypes = [user, pin, comment, postedBy, save]

// export default createSchema({
    
//     name: "default",

//     types: schemaTypes.concat([
//         user
//     ]),
// })