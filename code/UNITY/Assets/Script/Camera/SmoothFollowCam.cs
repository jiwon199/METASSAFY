using UnityEngine;
using UnityEngine.SceneManagement;
using static UnityEngine.GraphicsBuffer;

namespace UnityStandardAssets.Utility
{
    public class SmoothFollowCam : MonoBehaviour
    {
        public Transform target;
        public float distance = 10.0f;
        public float height = 5.0f;
        private float rotationDamping = 3.0f;
        private float heightDamping = 2.0f;

        private void Start()
        {
            //로비는 좀 더 가까운 카메라로 설정
            if (SceneManager.GetActiveScene().name == "Lobby")
            {
                distance = 5.0f;
                height = 2.0f;
            }
        }
        void LateUpdate()
        {
            if (target==null|| !target)
                return;

            var wantedRotationAngle = target.eulerAngles.y;
            var wantedHeight = target.position.y + height;
            var currentRotationAngle = transform.eulerAngles.y;
            var currentHeight = transform.position.y;

            currentRotationAngle = Mathf.LerpAngle(currentRotationAngle, wantedRotationAngle, rotationDamping * Time.deltaTime);
            currentHeight = Mathf.Lerp(currentHeight, wantedHeight, heightDamping * Time.deltaTime);

            var currentRotation = Quaternion.Euler(0, currentRotationAngle, 0);

            transform.position = target.position;
            transform.position -= currentRotation * Vector3.forward * distance;
            transform.position = new Vector3(transform.position.x, currentHeight, transform.position.z);
            transform.LookAt(target);
        }
    }

}
