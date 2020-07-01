import RPi.GPIO as GPIO
import time
import sys

in1 = 16
GPIO.setmode(GPIO.BOARD)
GPIO.setup(in1, GPIO.OUT)

GPIO.output(in1, False)

SwitchLED(10)

def SwitchLED(time):
  GPIO.output(in1, True)
  time.sleep(time)
  GPIO.output(in1, False)


