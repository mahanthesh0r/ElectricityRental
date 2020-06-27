import RPi.GPIO as GPIO
import time

in1 = 16
GPIO.setmode(GPIO.BOARD)
GPIO.setup(in1, GPIO.OUT)

GPIO.output(in1, False)

try:
    while True:
      for x in range(5):
            GPIO.output(in1, True)
            time.sleep(0.1)
            GPIO.output(in1, False)


except KeyboardInterrupt:
    GPIO.cleanup()
