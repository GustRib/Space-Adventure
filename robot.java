package ufjf;
import robocode.*;
import java.awt.Color;
import static robocode.util.Utils.normalRelativeAngleDegrees;

public class Gust extends Robot{

public void run(){
    do {
        turnRadarLeft(360);
        setAhead(200);
        turnRight(300);
    }while(true);
}

    public void mira(double Adv) {
        double A=getHeading()+Adv-getGunHeading();
            if (!(A > -180 && A <= 180)) {
                while (A <= -180)
                A += 360;
                while (A > 180)
                A -= 360;
            }
        turnGunRight(A);
}

public void fogo(double Distancia) {
    if (Distancia> 200 || getEnergy() < 15)
        fire(1);
    else if (Distancia > 50)
        fire(2);
    else
        fire(3);
}

	public void onScannedRobot(ScannedRobotEvent e) {
        if(e.getDistance() < 250) {
		    fire(3);
        }
        double distancia = e.getDistance();
        double angulo = e.getBearing();
        turnRight(angulo);
        ahead(distancia/2);
	}

	public void onHitByBullet(HitByBulletEvent e) {
        turnRight(e.getBearing());
		ahead(50);
	}

    // public void onBulletHit(BulletHitEvent e) {
    //     Acertos++;
    // }

    // public void onBulletMissed(BulletMissedEvent e) {
    //     vacilos++;
    // }

    // public void onBulletHitBullet(onBulletHitBulletEvent e) {

    // }

	public void onHitWall(HitWallEvent e) {
		turnLeft(180);
	}	

    public void onHitRobot(HitRobotEvent e) {
        mira(e.getBearing());
        fire(2);
    }

    public void dancinha() {
        setAhead(5);
        setTurnRight(360D);
        setTurnGunLeft(360D);
        setTurnRadarRight(30D);
}

    public void onWIn(WinEvent e) {
        dancinha();
    }

    public void onDeath(DeathEvent e) {
        System.out.println(getName()+"morreu!");
        System.out.println("Quantidade de inimigos ainda vivos: "+getOthers());
    }

    public void onRobotDeath(RobotDeathEvent e) {
        if(nome==e.getName())
        nome=null;
}
}
