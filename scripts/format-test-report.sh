
set -e

if [[ ! -f ../report.xml ]]; then
  echo "Error: report.xml not found!"
  exit 1
fi

REPORT_FILE="test-report.md"
echo "| Test Name | Status | Time (s) |" > $REPORT_FILE
echo "|-----------|--------|---------|" >> $REPORT_FILE

cat report.xml | xmllint --format - | grep "<testcase" | while read -r line; do
  name=$(echo "$line" | sed -n 's/.*name="\([^"]*\).*/\1/p')
  status=$(echo "$line" | sed -n 's/.*status="\([^"]*\).*/\1/p')
  time=$(echo "$line" | sed -n 's/.*time="\([^"]*\).*/\1/p')
  echo "| $name | $status | $time |" >> $REPORT_FILE
done

echo "✅ Test report generated: $REPORT_FILE"
