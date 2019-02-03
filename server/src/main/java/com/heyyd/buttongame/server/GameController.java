package com.heyyd.buttongame.server;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class GameController {

    @RequestMapping("/")
    public String test() {
        return "SERVER IS WORKING!\n";
    }

}
