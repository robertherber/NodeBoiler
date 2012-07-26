PORT_DEBUG=5858
PORT_INSPECTOR=8080
DEBUG=0
FILE=http-server.js

usage()
{
cat << EOF
usage: $0 options

This script run the test1 or test2 over a machine.

OPTIONS:
   -h      			Show this message
   -f 				Path to the Node.js executable
   -d 				Enable debug
   -D      			Debug port number ( + enable debug)
   -i  				Inspector port number
   -s               Shift all port numbers the specified steps

DEFAULTS:
	Port debug:		$PORT_DEBUG
	Port inspector:		$PORT_INSPECTOR
	Debug:			$DEBUG
	File:			$FILE
EOF
}

while getopts “h:p:D:i:f:s:d” OPTION
do
     case $OPTION in
         h)
             usage
             exit 1
             ;;
         p)
             PORT=$OPTARG
             ;;
         D)
             PORT_DEBUG=$OPTARG
             DEBUG=1
             ;;
         i)
             PORT_INSPECTOR=$OPTARG
             ;;
         d)
             DEBUG=1
             ;;
         f)
             FILE=$OPTARG
             ;;             
         s)
             PORT=$((PORT+$OPTARG))
             PORT_DEBUG=$((PORT_DEBUG+$OPTARG))
             PORT_INSPECTOR=$((PORT_INSPECTOR+$OPTARG))
             ;;             
         ?)
			 echo $OPTION
             usage
             exit
             ;;
     esac
done

if [ $DEBUG = 1 ]; then

    echo -e "1. Starting server '$FILE' (DEBUG)"
    node --debug-brk=$PORT_DEBUG $FILE &
    SERVER_PID=${!}

    echo -e "\n2. Starting node-inspector at port $PORT_INSPECTOR"
    node-inspector --web-port=$PORT_INSPECTOR &
    INSPECTOR_PID=${!}
    sleep 1 #Give node-inspector some startup time

    echo -e "\n3. Starting Chrome debugging instance"
    chromium-browser --app="http://localhost:$PORT_INSPECTOR/debug/?port=$PORT_DEBUG" --user-data-dir="~/.config/chromium/DEBUG$PORT_DEBUG" &
    BROWSER_PID=${!}

wait $BROWSER_PID
kill $SERVER_PID
kill $INSPECTOR_PID

else

    echo -e "Starting server '$FILE'"
    node $FILE
fi
