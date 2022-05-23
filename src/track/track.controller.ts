import { Controller, Get } from "@nestjs/common";

@Controller('/tracks')
export class TrackController {
    create(){

    }

    @Get()
    getAll(): string{
        return "sf";
    }

    getOne() {

    }

    remove() {

    }

}