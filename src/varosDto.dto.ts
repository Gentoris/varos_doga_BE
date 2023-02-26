import { IsNotEmpty, Min } from "class-validator"

export default class VarosDto {
    @IsNotEmpty()
    varos : string
    @Min(1)
    lakossag : Number
}