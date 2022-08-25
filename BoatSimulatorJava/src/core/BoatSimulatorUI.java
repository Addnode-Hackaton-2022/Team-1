package core;

import java.awt.BorderLayout;
import java.awt.Rectangle;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JSlider;
import javax.swing.JTable;
import javax.swing.JTextField;
import javax.swing.table.DefaultTableModel;

public class BoatSimulatorUI extends JFrame
{
    private static final long serialVersionUID = 1L;

    private String ICON_NAME = null;
    private JPanel iPanelExt;
    private JLabel lbl1;
    private JTextField txt1;
    private JLabel lbl3;
    private JSlider slider1;
    private JLabel lbl2;
    private JTable tbl3;
    private DefaultTableModel model_tbl3;
    private JButton btnStart;
    private JButton btnStop;
    private JButton btnReset;

    private int width = 801;
    private int height = 600;

    public static boolean isStarted = false;
    public static boolean reset = true;
    private List<Boat> iBoats = new ArrayList<>();
    private Random rand = new Random();

    private int nextRow = 0;

    public static void main(String[] args)
    {
        BoatSimulatorUI boatSimulatorUI = new BoatSimulatorUI();
        boatSimulatorUI.setVisible(true);
    }

    public BoatSimulatorUI()
    {
        super();
        setTitle("Boat Simulator");
        setSize(width, height);
        if (ICON_NAME != null)
        {
            setIconImage(getToolkit().getImage(ICON_NAME));
        }

        getContentPane().setLayout(null);
        iPanelExt = new JPanel();
        iPanelExt.setLayout(null);
        getContentPane().add(iPanelExt, BorderLayout.CENTER);

        lbl1 = new JLabel("Number of boats:");
        getContentPane().add(lbl1);
        lbl1.setBounds(38, 56, 122, 26);

        txt1 = new JTextField("3");
        getContentPane().add(txt1);
        txt1.setBounds(149, 51, 111, 27);

        lbl3 = new JLabel("Speed:");
        getContentPane().add(lbl3);
        lbl3.setBounds(38, 96, 122, 26);

        slider1 = new JSlider(0, 100);
        slider1.setValue(35);
        getContentPane().add(slider1);
        slider1.setBounds(149, 101, 558, 46);

        lbl2 = new JLabel("Output:");
        getContentPane().add(lbl2);
        lbl2.setBounds(38, 159, 115, 23);

        model_tbl3 = new DefaultTableModel(5000, 2);
        String header_tbl3[] = new String[]
        { "Boat", "Type", "Value" };
        model_tbl3.setColumnIdentifiers(header_tbl3);
        tbl3 = new JTable(model_tbl3);
        tbl3.getColumnModel().getColumn(1).setMaxWidth(120);
        tbl3.getColumnModel().getColumn(2).setMaxWidth(120);
        JScrollPane scroll_tbl3 = new JScrollPane(tbl3);
        getContentPane().add(scroll_tbl3);
        scroll_tbl3.setBounds(38, 182, 726, 293);

        btnReset = new JButton("Reset");
        getContentPane().add(btnReset);
        btnReset.setBounds(49, 487, 103, 55);
        btnReset.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(ActionEvent e)
            {
                btnResetClicked(e);
            }
        });

        btnStart = new JButton("Start");
        getContentPane().add(btnStart);
        btnStart.setBounds(270, 487, 103, 55);
        btnStart.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(ActionEvent e)
            {
                btnStartClicked(e);
            }
        });

        btnStop = new JButton("Stop");
        getContentPane().add(btnStop);
        btnStop.setBounds(406, 488, 103, 55);
        btnStop.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(ActionEvent e)
            {
                btnStopClicked(e);
            }
        });

        setDefaultCloseOperation(EXIT_ON_CLOSE);

        Runnable myRunnable = new Runnable()
        {
            public void run()
            {
                while (true)
                {
                    try
                    {
                        Thread.sleep(500);
                    }
                    catch (InterruptedException e)
                    {
                        e.printStackTrace();
                    }

                    changeBoatValue();
                }
            }
        };

        Thread thread = new Thread(myRunnable);
        thread.start();
    }

    private void changeBoatValue()
    {
        if (isStarted)
        {
            int boatIndex = rand.nextInt(iBoats.size());
            Boat boat = iBoats.get(boatIndex);
            int shouldUpdate = rand.nextInt(5000 / (100-slider1.getValue()));

            if (shouldUpdate > 55)
            {
                switch (boat.getDirection())
                {
                    case increase:
                        boat.increaseValue();
                        break;

                    case decrease:
                        boat.decreaseValue();
                        break;

                    case setValues:
                        boat.setValue(rand.nextInt(100));
                        break;

                    default:
                        break;
                }

                boat.decreaseValue();
            }
        }
    }

    private void btnStartClicked(ActionEvent e)
    {
        if (reset)
        {
            btnResetClicked(e);
        }

        isStarted = true;
    }

    private void btnResetClicked(ActionEvent e)
    {
        isStarted = false;
        initBoats(Integer.valueOf(txt1.getText()));
    }

    private void initBoats(Integer count)
    {
        String[] boatNames =
        { "Lilla gumman", "Sjöjungfrun", "Skorven", "Plåtis", "Havskatten" };
        iBoats.clear();
        for (int i = 0; i < count; i++)
        {
            iBoats.add(new Boat(boatNames[rand.nextInt(count)], this));
        }
    }

    private void btnStopClicked(ActionEvent e)
    {
        isStarted = false;
    }

    public void sendData(Boat boat)
    {
        System.out.println(boat.getName() + ", " + boat.getType() + ", " + boat.getValue());
        model_tbl3.setValueAt(boat.getName(), nextRow, 0);
        model_tbl3.setValueAt(String.valueOf(boat.getType()), nextRow, 1);
        model_tbl3.setValueAt(boat.getValue(), nextRow, 2);

        tbl3.getSelectionModel().setSelectionInterval(nextRow, nextRow);
        tbl3.scrollRectToVisible(new Rectangle(tbl3.getCellRect(nextRow++, 1, true)));

        PostJson.sendToCloud(boat);
    }

}
