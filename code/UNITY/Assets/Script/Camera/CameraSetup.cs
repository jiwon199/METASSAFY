using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Cinemachine;
using Photon.Pun;

public class CameraSetup : MonoBehaviourPun
{
    public float speed = 10.0f;
    public Transform cameraTrarget;

    private CinemachineVirtualCamera followCam;
    private Vector3 worldDefalutForward;
    private const int zoomSpeed = 50;

    private bool view = false;

    private Vector3 headPosition;

    // Start is called before the first frame update
    void Start()
    {
        if (photonView != null)
        {
            //���� ���� �÷��̾��ϱ�?
            if (photonView.IsMine)
            {
                // ���� �ִ� �ó׸ӽ� ���� ī�޶� ã��
                followCam =
                    FindObjectOfType<CinemachineVirtualCamera>();
                // ���� ī�޶��� ���� ����� �ڽ��� Ʈ���������� ����
                followCam.Follow = transform.Find("CamPivot").transform;
                followCam.LookAt = transform.Find("CamPivot").transform;
                //worldDefalutForward = transform.Find("CamPivot").transform.forward;
            }
        }

    }

    // Update is called once per frame
    void Update()
    {
        // ���� �÷��̾�
        if (photonView.IsMine)
        {
            if (!view)
            {
                float scroll = Input.GetAxis("Mouse ScrollWheel") * speed * -1;

                //�ִ� ����
                if (followCam.m_Lens.FieldOfView <= 10.0f && scroll < 0)
                {
                    followCam.m_Lens.FieldOfView = 10.0f;
                }

                // �ִ� �� �ƿ�
                else if (followCam.m_Lens.FieldOfView >= 100.0f && scroll > 0)
                {
                    followCam.m_Lens.FieldOfView = 100.0f;
                }

                // ���� �ƿ� �ϱ�.
                else
                {
                    followCam.m_Lens.FieldOfView += scroll;
                }
            }
        }
    }
}
