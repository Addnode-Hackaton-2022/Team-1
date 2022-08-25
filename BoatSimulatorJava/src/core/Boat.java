package core;

import java.util.Random;

public class Boat
{
    private String mName;
    private int iValue;
    private BoatSimulatorUI mUi;
    private int iType;
    private DirectionsEnum iDirection;
    
    

    public int getType()
    {
        return iType;
    }

    public Boat(String name, BoatSimulatorUI ui)
    {
        mName = name;
        mUi = ui;
        Random rand = new Random();
        iValue = rand.nextInt(100);
        iType = rand.nextInt(2);
        iDirection = DirectionsEnum.values()[rand.nextInt(DirectionsEnum.values().length)];
    }

    public void decreaseValue()
    {
        if (iValue > 0)
        {
            iValue--;
            mUi.sendData(this);
        }
    }

    public void increaseValue()
    {
        if (iValue < 100)
        {
            iValue++;
            mUi.sendData(this);
        }
    }

    public void setValue(int value)
    {
        iValue = value;
        mUi.sendData(this);
    }

    public String getName()
    {
        return mName;
    }

    public int getValue()
    {
        return iValue;
    }

    public DirectionsEnum getDirection()
    {
        return iDirection;
    }
}
