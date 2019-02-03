package com.heyyd.buttongame.server;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.heyyd.buttongame.dto.Game;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:4200")
public class GameController {

    private ArrayList<Game> games = new ArrayList<Game>();

    public GameController() {
        super();
        games.add(new Game(0, "Game"));
    }

    @RequestMapping(method = RequestMethod.GET)
    public ArrayList<Game> test() {
        return games;
    }

}
