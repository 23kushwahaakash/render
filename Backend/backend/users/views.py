from rest_framework.decorators import api_view
from rest_framework.response import Response
from backend.settings import RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET
from .serializers import StudentPaymentSerializer

# Create your views here.
import razorpay
client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))


# view to create razorpay order
@api_view(["POST"])
def create_order(request):
    order = client.order.create({
        "amount": 50000,  # ₹500 in paise is 50000
        "currency": "INR",
        "payment_capture": 1
    })

    return Response({
        "order_id": order["id"],
        "razorpay_key":RAZORPAY_KEY_ID,
        "amount": 50000,
    })
    
# view to verify payment and save student details
@api_view(["POST"])
def verify_and_save(request):
    serializer = StudentPaymentSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=400)

    data = serializer.validated_data

    try:
        client.utility.verify_payment_signature({
            "razorpay_order_id": data["razorpay_order_id"],
            "razorpay_payment_id": data["razorpay_payment_id"],
            "razorpay_signature": data["razorpay_signature"],
        })

        student = serializer.save()

        return Response({
            "message": "Payment successful. Registration completed.",
            "student_id": student.id
        }, status=201)

    except Exception:
        return Response(
            {"error": "Payment verification failed"},
            status=400
        )
