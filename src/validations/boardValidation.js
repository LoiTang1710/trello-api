import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '@/utils/ApiError'

const createNew = async (req, res, next) => {
  /**
   * Note: Mặc định chúng ta không cần phải custom message ở phía BE làm gì vì để cho Front-end tự
   * validate và custom message phía FE cho đẹp.
   *
   * Back-end chỉ cần validate Đảm Bảo Dữ Liệu Chuẩn Xác, và trả về message mặc định từ thư viện là được.
   *
   * Quan trọng: Việc Validate dữ liệu BẮT BUỘC phải có ở phía Back-end vì đây là điểm cuối để lưu trữ dữ
   * liệu vào Database.
   *
   * Và thông thường trong thực tế, điều tốt nhất cho hệ thống là hãy luôn validate dữ liệu ở cả Back-end
   * và Front-end nhé.
   */

  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': '{{#label}} is required!!',
      'string.max':
        '{{#label}} length must be less than or equal to {{#limit}} characters long',
      'string.min':
        '{{#label}} length must be at least {{#limit}} characters long'
    }),
    desciption: Joi.string().required().min(3).max(256).trim().strict()
  })
  try {
    console.log('request body: ', req.body)
    // abortEarly cho trưởng hợp nhiều errors thì trả về tất cà thay vì 1
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // Validate dữ liệu done thì continue request tới controllers
    next()
    res
      .status(StatusCodes.CREATED)
      .json({ message: 'POST from Validation: Apis create lists board...' })
  } catch (error) {
    // const errorMessage = new Error(error).message
    // const customMessages = new ApiError(
    //   StatusCodes.UNPROCESSABLE_ENTITY,
    //   errorMessage
    // )
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    )
  }
}

export const boardValidation = { createNew }
