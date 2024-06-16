import { PartialType } from "@nestjs/mapped-types";
import CreateUserDTO from "./create-user.dto";

export default class UpdateUserDto extends PartialType(CreateUserDTO){}