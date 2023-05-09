import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class LoginRequestDto {

    @ApiProperty({ example: "chabok", required: true })
    @IsNotEmpty()
    username: string;

    @ApiProperty({ example: "1234", required: true })
    @IsNotEmpty()
    password: string;

}