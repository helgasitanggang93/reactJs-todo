import {label} from './labelsVariable';

/**
 * Storing buttons name
 * @type {
  {title: {
    emptyTitle: string,
    titleMoreThanLength: string,
  },
  description: {
    emptyDescription: string,
    descMoreThanLength: string
  },
  dueDate: {
    emptyDueDate: string,
    dueLessThanNow: string
  },
  image: {
    sizeMoreThan: string,
    anotherImage: string
  },
  name: {
    emptyName: string
  },
  email: {
    emptyEmail: string,
    inavalidEmail: string
  },
  password: {
    emptyPassword: string,
    passMoreThanLength: string
  },
  role: {
    roleEmpty: string
  }
    }
  }
   */

export const errMessage = {
  title: {
    emptyTitle: 'You must enter a title',
    titleMoreThanLength: `Must be ${label.numLengthOfTitle} Characters or less`,
  },
  description: {
    emptyDescription: 'You must enter a description',
    descMoreThanLength: `Must be ${label.numLengthOfDesc} Characters or less`
  },
  dueDate: {
    emptyDueDate: 'You must enter a due date',
    dueLessThanNow: 'Date must be greather'
  },
  image: {
    sizeMoreThan: `Maximum file size is ${label.sizeImage}`,
    anotherImage: 'should upload jpg, png or jpeg'
  },
  name: {
    emptyName: 'name must be required'
  },
  email: {
    emptyEmail: 'email must be required',
    inavalidEmail: 'email format invalid'
  },
  password: {
    emptyPassword: 'password must be required',
    passMoreThanLength: `minimum length password is ${label.numLengthOfPassword}`
  },
  role: {
    roleEmpty: 'please pick your role'
  }
}