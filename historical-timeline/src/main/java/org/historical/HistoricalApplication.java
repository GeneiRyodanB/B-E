package org.historical;

import io.quarkus.runtime.Quarkus;
import io.quarkus.runtime.annotations.QuarkusMain;

@QuarkusMain
public class HistoricalApplication {
    public static void main(String[] args) {
        Quarkus.run(args);
    }
}
