package com.heyyd.buttongame.dto;

public class Game {
    private int id;
    private String name;
    
    public Game(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }
}
