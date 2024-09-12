import { checkSchema } from 'express-validator'
import { MediaTypeQuery, PeopleFollowQuery } from '~/constants/enum'
import { SEARCH_MESSAGES } from '~/constants/messages'
import { validate } from '~/utils/validation'

export const searchValidator = validate(
  checkSchema(
    {
      content: {
        isString: {
          errorMessage: SEARCH_MESSAGES.CONTENT_MUST_BE_STRING
        }
      },
      media_type: {
        optional: true,
        isIn: {
          options: [Object.values(MediaTypeQuery)],
          errorMessage: `Media type must be  one of ${Object.values(MediaTypeQuery).join(', ')}`
        }
      },
      people_follow: {
        optional: true,
        isIn: {
          options: [Object.values(PeopleFollowQuery)],
          errorMessage: SEARCH_MESSAGES.PEOPLE_FOLLOW_MUST_BE_ANYONE_OR_FOLLOWING
        }
      }
    },
    ['query']
  )
)
