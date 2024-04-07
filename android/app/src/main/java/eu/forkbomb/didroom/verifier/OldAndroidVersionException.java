package eu.forkbomb.didroom.verifier;

public class OldAndroidVersionException extends Exception {
    OldAndroidVersionException() {
        super("Android version less than minimum supported");
    }
}

